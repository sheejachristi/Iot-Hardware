/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "stm32f4xx_it.h"
#include "MPLSStimulation.h"

/*Private Includes---------------*/
#include <string.h>
/*define---------------------*/
#define BUFFERSIZE 256
/* Private variables ---------------------------------------------------------*/ 
extern DAC_HandleTypeDef hdac;
extern DMA_HandleTypeDef hdma_dac1;
extern TIM_HandleTypeDef htim1;
extern UART_HandleTypeDef huart4;

char Rx_Data[BUFFERSIZE];
char Tx_Data[BUFFERSIZE];
int URT_Ptr = 0;
uint8_t p_rx_buffer;
char txdata[5] = "ok\r\n";

uint8_t dac_signal[7]= {0,40,80,120,160,200,240};
uint8_t sp_buffer[3]={0x0F,0x0F,0x0F};
extern STIMULATION_TypeDef stimulationSettings;
extern int counterPeriod;
int periodCounter =0;
//uint8_t dac_signal[2] = {0,255};
/* Private function prototypes -----------------------------------------------*/
//void STIM_HS_Shiftregister_Write(uint8_t *spiTxData,int datalength);
void UART_TX (void);
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *uart);
void testStimulation();
/*------------------------------------------------------------------------------
 * Application main thread
 *----------------------------------------------------------------------------*/
void app_main (void)

{
	  __HAL_UART_ENABLE_IT(&huart4,UART_IT_RXNE);
	__HAL_UART_ENABLE_IT(&huart4,UART_IT_TC);
//	 HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_1);
//	HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_2);
//	HAL_TIM_OC_Start_IT(&htim1,TIM_CHANNEL_3);
	testStimulation();
	//DAC code for staircase wave//
//	HAL_TIM_Base_Start(&htim6);
	//HAL_DAC_Start_DMA(&hdac,DAC_CHANNEL_1,(uint32_t*)dac_signal,7,DAC_ALIGN_8B_R);
	//HAL_DAC_Start(&hdac,DAC_CHANNEL_1);
	/* Infinite loop */
	while(1){
		
		//MPSTM_LoadShiftReg(sp_buffer);
	}
}

void testStimulation()
{
	stimulationSettings.currentInMa=25;
	stimulationSettings.pulsePhase =200;
	stimulationSettings.pulseFrequency=100;
	stimulationSettings.seqCountN = 1000;
	stimulationSettings.cyclesFadeL=20;
	stimulationSettings.cyclesHoldM=100;
	stimulationSettings.cyclesDelayK=400;
	MPSTM_StartStimulation();
	
}


//void STIM_HS_shiftregister_Write(uint8_t *spiTxData,int datalength)
//{
//	
//	//HAL_GPIO_WritePin(STIM_HS_OE_GPIO_Port,STIM_HS_OE_Pin,GPIO_PIN_RESET);
//	
//	HAL_SPI_Transmit(&hspi1,spiTxData,datalength,50);
//	
//	HAL_GPIO_WritePin(STIM_HS_OE_GPIO_Port,STIM_HS_OE_Pin,GPIO_PIN_SET);
//	
//}

void HAL_TIM_PWM_PulseFinishedCallback(TIM_HandleTypeDef *htim)
{
	 if(htim->Channel == HAL_TIM_ACTIVE_CHANNEL_1){
		 if(periodCounter==0){
			 HAL_GPIO_TogglePin(GPIOB,GPIO_PIN_15);
			 MPSTM_OnStimTimerPulseSourcePhaseStart();
			 ++periodCounter;
		 }else if(periodCounter==1){
			 HAL_GPIO_TogglePin(GPIOB,GPIO_PIN_15);
			 MPSTM_OnStimTimerPulseSinkPhaseStart();
				++periodCounter;
		 }
		 else if(periodCounter==2)
		 {++periodCounter;
			 MPSTM_OnStimTimerPulsePhaseEnd();
		 }
		 else if(periodCounter<counterPeriod){
			 ++periodCounter;
		 }else if(periodCounter==counterPeriod){
			 periodCounter=0;
	  }
	}
//		if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_2){
//			HAL_GPIO_TogglePin(GPIOB,GPIO_PIN_15);
//		//	MPSTM_OnStimTimerPulsePhaseEnd();
//		}
//			if (htim->Channel == HAL_TIM_ACTIVE_CHANNEL_3){
//			HAL_GPIO_TogglePin(GPIOB,GPIO_PIN_15);
//			//
//		}
	
}
/*UART Tranmit function*/
void UART_TX (void)
{
	HAL_UART_Transmit(&huart4,(uint8_t*)Tx_Data,strlen(Tx_Data),10);
}
/* UART Receive Process bytes*/
void UART_Receive_process(void)
{
	memset(Tx_Data,0,256);
	int length = strlen(Rx_Data);
	strncpy(Tx_Data,Rx_Data,length);
  UART_TX();
	memset(Tx_Data,0,256);
	strncpy(Tx_Data,txdata,5);
	UART_TX();
}

/*UART Receive callback function*/
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *uart)
{
	/*prevent unused argument(s) complication warning*/
	UNUSED(uart);
	Rx_Data[URT_Ptr] = p_rx_buffer;
	if(URT_Ptr>2){
		if((Rx_Data[URT_Ptr]=='\r')||(Rx_Data[URT_Ptr]=='\n'))
		{
			
			UART_Receive_process();
			URT_Ptr =0;
			memset(Rx_Data,0,BUFFERSIZE);
		  return;
			
		}
	}
	URT_Ptr++;
	if(URT_Ptr>=BUFFERSIZE)URT_Ptr = 0;
	
}