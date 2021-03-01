/*Private Includes---------------*/
#include "MPLSStimulation.h"


/*define---------------------*/
extern SPI_HandleTypeDef hspi1;
extern DAC_HandleTypeDef hdac;
/*
During Onset and Offset DAC values increments in staircase form. 
This function calculates the value which is incremented in each 
step of OnSet and Offset. According to circuit a 100 MV set on the 
DAC pin will cause a current limit of 1 ma on each electrode.
Assume a value of X produce 1 mv output on DAC. 

VREF = 2.9
MaxDAC Value = 4096 (12 Bit DAC)//bijoy max dac value 4095
Value for 100mv (X) = (4096/2900)*100 = 141
Set Current = N ma
Limit Voltage = N*100
OnSetPulses = L
DACValueOnHOLD = N*100*X
DACDeltaValue = N*100*X/L

*/

float clockPerod =(int) ((float)(1/(float)STIM_CLOCK_FREQUENCY)*1000000);
int dacValueFor1ma = ((float)STIM_DAC_MAXVAL/(float)STIM_DAC_VREF*1000)*100;
int dacValueForSetCurrent=0;
int deltaDACStepValue;
int dacHoldValueForSetCurrent;
int dacCurValue;
int onsetStepCounter;
int offsetStepCounter;
int holdStateCounter;
int offStateCounter;
int sequenceCounter;
int preScaler;
int counterPeriod;
bool stimRun;
extern TIM_HandleTypeDef htim1;

STIMULATION_TypeDef stimulationSettings;
int stimulationState;
int pulseTotTime; //In millis
int pulseOffTime; //In Millis

void MPSTM_CalcDACDeltaValue()
{
	dacValueFor1ma = 141;//((float)STIM_DAC_MAXVAL/(float)(STIM_DAC_VREF*1000))*100;
	dacHoldValueForSetCurrent = dacValueFor1ma*stimulationSettings.currentInMa;
	deltaDACStepValue = (float)(dacHoldValueForSetCurrent/(float)stimulationSettings.cyclesFadeL);
}

void MPSTM_SetDACValue(int32_t adcVal )
{
	HAL_DAC_Start(&hdac,DAC_CHANNEL_1);
	HAL_DAC_SetValue(&hdac,DAC_CHANNEL_1,DAC_ALIGN_12B_R,adcVal);
	
}

void MPSTM_StimulationTimerInit(int preScale,int period)
{
  /* USER CODE BEGIN TIM1_Init 0 */

  /* USER CODE END TIM1_Init 0 */

  TIM_ClockConfigTypeDef sClockSourceConfig = {0};
  TIM_MasterConfigTypeDef sMasterConfig = {0};
  TIM_OC_InitTypeDef sConfigOC = {0};
  TIM_BreakDeadTimeConfigTypeDef sBreakDeadTimeConfig = {0};

  /* USER CODE BEGIN TIM1_Init 1 */

  /* USER CODE END TIM1_Init 1 */
  htim1.Instance = TIM1;
  htim1.Init.Prescaler = preScale;
  htim1.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim1.Init.Period = 1;
  htim1.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
  htim1.Init.RepetitionCounter = 0;
  htim1.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_ENABLE;
  if (HAL_TIM_Base_Init(&htim1) != HAL_OK)
  {
    Error_Handler();
  }
  sClockSourceConfig.ClockSource = TIM_CLOCKSOURCE_INTERNAL;
  if (HAL_TIM_ConfigClockSource(&htim1, &sClockSourceConfig) != HAL_OK)
  {
    Error_Handler();
  }
  if (HAL_TIM_OC_Init(&htim1) != HAL_OK)
  {
    Error_Handler();
  }
  sMasterConfig.MasterOutputTrigger = TIM_TRGO_UPDATE;
  sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
  if (HAL_TIMEx_MasterConfigSynchronization(&htim1, &sMasterConfig) != HAL_OK)
  {
    Error_Handler();
  }
  sConfigOC.OCMode = TIM_OCMODE_TIMING;
  sConfigOC.Pulse = 1;
  sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
  sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
  sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
  sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
  sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
  if (HAL_TIM_OC_ConfigChannel(&htim1, &sConfigOC, TIM_CHANNEL_1) != HAL_OK)
  {
    Error_Handler();
  }
	sConfigOC.OCMode = TIM_OCMODE_TIMING;
  sConfigOC.Pulse =period-1;
  sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
  sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
  sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
  sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
  sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
  if (HAL_TIM_OC_ConfigChannel(&htim1, &sConfigOC, TIM_CHANNEL_2) != HAL_OK)
  {
    Error_Handler();
  }
	
/*	sConfigOC.OCMode = TIM_OCMODE_TIMING;
  sConfigOC.Pulse = period-2;
  sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
  sConfigOC.OCNPolarity = TIM_OCNPOLARITY_HIGH;
  sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
  sConfigOC.OCIdleState = TIM_OCIDLESTATE_RESET;
  sConfigOC.OCNIdleState = TIM_OCNIDLESTATE_RESET;
	if (HAL_TIM_OC_ConfigChannel(&htim1, &sConfigOC, TIM_CHANNEL_3) != HAL_OK)
  {
    Error_Handler();
  }*/
  sBreakDeadTimeConfig.OffStateRunMode = TIM_OSSR_DISABLE;
  sBreakDeadTimeConfig.OffStateIDLEMode = TIM_OSSI_DISABLE;
  sBreakDeadTimeConfig.LockLevel = TIM_LOCKLEVEL_OFF;
  sBreakDeadTimeConfig.DeadTime = 0;
  sBreakDeadTimeConfig.BreakState = TIM_BREAK_DISABLE;
  sBreakDeadTimeConfig.BreakPolarity = TIM_BREAKPOLARITY_HIGH;
  sBreakDeadTimeConfig.AutomaticOutput = TIM_AUTOMATICOUTPUT_DISABLE;
  if (HAL_TIMEx_ConfigBreakDeadTime(&htim1, &sBreakDeadTimeConfig) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN TIM1_Init 2 */
   HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_1);
	// HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_2);
	// HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_3);
  /* USER CODE END TIM1_Init 2 */

	
}




/*
This function is called once before starting the stimulation process
It calculate the pulse off time in micros using stimulation frequnecy
and pulse phase time.

Loads shift regsiter with source electrode settings. Set MC pins for
Sink electrodes
*/
void MPSTM_InitStimulationParams()
{
	//Initialize timer values
	stimulationState = STIM_SATUS_INIT;
	clockPerod =0.0625;//(int) ((float)(1/(float)STIM_CLOCK_FREQUENCY)*1000000);
	pulseTotTime = (int)((float)(1/(float)stimulationSettings.pulseFrequency)*1000000); 	 //Pulse Tot in micros
	pulseOffTime = pulseTotTime - stimulationSettings.pulsePhase; //Pulse Off Time in micro seconds
  preScaler = 	((int)(stimulationSettings.pulsePhase/clockPerod));
	counterPeriod = pulseOffTime/stimulationSettings.pulsePhase;
	
	sequenceCounter=0;
	stimRun=true;
	
}
/*
Public function called to start stimulation.
Pre-Requisites : Stimulation structure is initialized
Initialize global variables and settings flags and start the stimulation timer. 
Stimulation is implemented as a simple state machine. Timer function handles 
most of the states.Assumes that Stimulation Global Structure is populated before
calling this function.
*/
void MPSTM_StartStimulation()
{
	MPSTM_InitStimulationParams();
	MPSTM_CalcDACDeltaValue();
	stimulationState = STIM_SATUS_ONSET;
	onsetStepCounter=0;
	//Start initial pulse
	dacCurValue = deltaDACStepValue;
	//init timer for stimulationSettings.pulsePhase
	MPSTM_LoadShiftReg(stimulationSettings.sourceElecs); 

	MPSTM_StimulationTimerInit(preScaler,counterPeriod);
	MPSTM_OnStimTimerPulseSourcePhaseStart();
}
/*
This function is called from stimulation timer interrupt service routine. 
When time is up for pulse phase 
Most of the work is done from here based on the stimulation state variable.
Tasks to be done on each state

STIM_SATUS_ONSET
	If highLowState is high- switch on source and sink ckts steps below
	Load DAC value- curDACOutVale to DAC
	Output Enable Shift register
	Adjust  curDACOutVale to next step value by adding dacDeltaValue increment.
	highLowState set to zero
	If highLowState is low -> Switch off source and sink ckts steps below
	Output Tristate Shift register
	Increment onsetCounter
	If onsetCounter> L set state to STIM_SATUS_HOLD
	highLowState set to zero.
	Increment pulseCounter
STIM_SATUS_HOLD
	If highLowState is high-switch on source and sink ckts steps below
	Output Enable Shift register
	highLowState set to zero
	If highLowState is low -> Switch off source and sink ckts steps below
	Output Tristate Shift register
	Increment holdCounter
	If holdCounter> M set state to STIM_SATUS_OFFSET
	highLowState set to one.
STIM_SATUS_OFFSET
	If highLowState is high- switch on source and sink ckts steps below
	Load DAC value- curDACOutVale to DAC
	Output Enable Shift register
	Adjust  curDACOutVale to next step value by subtracting dacDeltaValue.
	highLowState set to zero
	If highLowState is low -> Switch off source and sink ckts steps below
	Output Tristate Shift register
	Increment offsetCounter
	If offsetCounter> L set state to STIM_SATUS_DELAY
	highLowState set to one.
	Increment pulseCounter
STIM_SATUS_DELAY
	If highLowState is high-switch on source and sink ckts steps below
	Output Tristate Shift register
	highLowState set to zero
	If highLowState is low -> Switch off source and sink ckts steps below
	Output Tristate Shift register
	Increment delayCounter
	Increment pulseCounter
	If delayCounter> M 
	set state to STIM_SATUS_OFFSET
	If pulseCounter > totPulseCounter set state to STIM_SATUS_STOP
	highLowState set to one.


*/
void MPSTM_OnStimTimerPulseSourcePhaseStart()
{
	switch(stimulationState)
	{
		case STIM_SATUS_ONSET:
				MPSTM_DisableAllSinkElectrodes();
			  //Calculate cur dac value
				dacCurValue = deltaDACStepValue * onsetStepCounter;
				//Load DAC value 
				MPSTM_SetDACValue(dacCurValue);	
				MPSTM_ShiftRegLatchLoad();
				MPSTM_EnableSinkElectrodes(stimulationSettings.sinkElecs);
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sinkElecs); 																		
				break;
		case STIM_SATUS_HOLD:
				MPSTM_DisableAllSinkElectrodes();
				MPSTM_ShiftRegLatchLoad();
				MPSTM_EnableSinkElectrodes(stimulationSettings.sinkElecs);
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sinkElecs); 	
				break;
		case STIM_SATUS_OFFSET:
				MPSTM_DisableAllSinkElectrodes();
			  //Calculate cur dac value
				dacCurValue = (dacHoldValueForSetCurrent-(deltaDACStepValue * offsetStepCounter));
				//Load DAC value 
				MPSTM_SetDACValue(dacCurValue);
				MPSTM_ShiftRegLatchLoad();
				MPSTM_EnableSinkElectrodes(stimulationSettings.sinkElecs);
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sinkElecs); 
				//If onset counter reach max change state
				break;
		case STIM_SATUS_DELAY:
			  MPSTM_DisableAllSinkElectrodes();
				break;
		
	}
	if(stimRun)
	{
	
	//Init Timer for PulsePhase 
	//It calls MPSTM_OnStimTimerPulsePhaseEnd() on timer up
	}
}

void MPSTM_OnStimTimerPulseSinkPhaseStart()
{
	switch(stimulationState)
	{
		case STIM_SATUS_ONSET:
			  MPSTM_DisableAllSinkElectrodes();
				++onsetStepCounter;
			  //Calculate cur dac value
				dacCurValue = deltaDACStepValue * onsetStepCounter;
				//Load DAC value 
				MPSTM_SetDACValue(dacCurValue);
				MPSTM_EnableSinkElectrodes(stimulationSettings.sinkElecs);
				MPSTM_ShiftRegLatchLoad();
				//If onset counter reach max change state
		    if(onsetStepCounter>= stimulationSettings.cyclesFadeL)
				{
					onsetStepCounter=0;
					stimulationState= STIM_SATUS_HOLD;
					holdStateCounter=0;
				}
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sinkElecs); 																		
				break;
		case STIM_SATUS_HOLD:
				MPSTM_DisableAllSinkElectrodes();
				MPSTM_ShiftRegLatchLoad();
				MPSTM_EnableSinkElectrodes(stimulationSettings.sourceElecs);
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sourceElecs); 	
				++holdStateCounter;
				if(holdStateCounter>=stimulationSettings.cyclesHoldM)
				{
					stimulationState= STIM_SATUS_OFFSET;
					holdStateCounter=0;
					offsetStepCounter=0;
				}
				break;
		case STIM_SATUS_OFFSET:
				MPSTM_DisableAllSinkElectrodes();
				//Load DAC value 
				MPSTM_SetDACValue(dacCurValue);
				MPSTM_ShiftRegLatchLoad();
				MPSTM_EnableSinkElectrodes(stimulationSettings.sourceElecs);
				//Load shift reg with sink electrodes for next phase 
				//Loading ahed to avoid delay
				MPSTM_LoadShiftReg(stimulationSettings.sourceElecs); 
				//If onset counter reach max change state
		    if(offsetStepCounter>= stimulationSettings.cyclesFadeL)
				{
					onsetStepCounter=0;
					stimulationState= STIM_SATUS_DELAY;
					holdStateCounter=0;
					offStateCounter=0;
				}
				++offsetStepCounter;
				break;
		case STIM_SATUS_DELAY:
				MPSTM_DisableAllSinkElectrodes();
			  ++offStateCounter;
				if(offStateCounter>= stimulationSettings.cyclesDelayK)
				{
					stimulationState = STIM_SATUS_ONSET;
				}
				++sequenceCounter;
				if(sequenceCounter>=stimulationSettings.seqCountN)
				{
					stimRun = false;
				}
				break;
		
	}
	if(stimRun)
	{
	//	MPSTM_StartTimerPulsePhase(stimulationSettings.pulsePhase);
	//Init Timer for PulsePhase 
	//It calls MPSTM_OnStimTimerPulsePhaseEnd() on timer up
	}
}
	

/*
 This timer function is triggered at the end of pulse phase
 It switch of current sources and start the timer for pulse off 
 duration. At the end pulse off duration it triggers MPSTM_OnStimTimerPulsePhaseStart()
*/
void MPSTM_OnStimTimerPulsePhaseEnd()
{
	//MPSTM_ShiftRegOutputEnable(false);
	MPSTM_DisableAllSinkElectrodes();
	if(stimRun)
	{

	//init Timer for pulse off pahase 
	//It calls MPSTM_OnStimTimerPulsePhaseStart()on timer up
	}
}
//
void MPSTM_StimulationParser(char * stimationParams)
{
}
void MPSTM_PowerUpShiftReg(bool onOff)
{
	if(onOff)
	{
		/*ENA Pin set to high*/
		HAL_GPIO_WritePin(STIM_HS_ENA_GPIO_Port,STIM_HS_ENA_Pin,GPIO_PIN_SET);
	}else
	{
		/*ENA Pin set to low*/
		HAL_GPIO_WritePin(STIM_HS_ENA_GPIO_Port,STIM_HS_ENA_Pin,GPIO_PIN_RESET);
	}
}
void MPSTM_LoadShiftReg(uint8_t * SourceElec)
{
	HAL_SPI_Transmit(&hspi1,SourceElec,3,50);
}
void MPSTM_ShiftRegLatchLoad(void)
{
	
	/*LOAD Pin set to high*/
	HAL_GPIO_WritePin(STIM_HS_LOAD_GPIO_Port,STIM_HS_LOAD_Pin,GPIO_PIN_SET);
}
/* SET STIM_HS_OE pin to enable the OE pin of shift register.*/
void MPSTM_ShiftRegOutputEnable(bool enable)
{
	if(enable)
	{
		/*OE Pin set to low*/
		HAL_GPIO_WritePin(STIM_HS_OE_GPIO_Port,STIM_HS_OE_Pin,GPIO_PIN_SET);
	}else
	{
		/*OE Pin set to high*/
		HAL_GPIO_WritePin(STIM_HS_OE_GPIO_Port,STIM_HS_OE_Pin,GPIO_PIN_RESET);
		/*LOAD Pin set to low*/
		HAL_GPIO_WritePin(STIM_HS_LOAD_GPIO_Port,STIM_HS_LOAD_Pin,GPIO_PIN_RESET);
	}
		
}
//Set all sink elctrodes low state 
void MPSTM_DisableAllSinkElectrodes()
{
	
}

void MPSTM_EnableSinkElectrodes(uint8_t *sinkElectrodes)
{
	GPIOD->ODR = 0x00U;
	GPIOE->ODR &= ~(0XF0);
	uint16_t GPIOD_16pin = (uint16_t)sinkElectrodes[1]<<8 | sinkElectrodes[0] ;
	uint16_t GPIOE_17_24pin = GPIOE->ODR;
	GPIOE_17_24pin |= sinkElectrodes[2];
	GPIOD->ODR = GPIOD_16pin;
	GPIOE->ODR = GPIOE_17_24pin;
}