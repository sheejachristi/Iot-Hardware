
/**
  ******************************************************************************
  * @file           : MPLSStimulation.h
  * @brief          : Stimulation header file
  ******************************************************************************
  * @auther : iOrbit
  *
  ******************************************************************************
  */
	
#ifndef __MPLSStimultion_H
#define __MPLSStimultion_H
#include "main.h"
#include "stm32f4xx_hal.h"
#include <stdint.h>
#include <stdbool.h>

#define STIM_SATUS_INIT 0
#define STIM_SATUS_ONSET 1
#define STIM_SATUS_HOLD 2
#define STIM_SATUS_OFFSET 3
#define STIM_SATUS_DELAY 4

#define STIM_DAC_VREF 2.9f
#define STIM_DAC_MAXVAL 4096
#define STIM_CUR_LIMIT_VOLT_PER_MA 0.1
#define STIM_CLOCK_FREQUENCY 16000000

typedef struct {
	char channels[24]; //Channel settings recvd from app as string
	uint8_t sourceElecs[3]; //24 bit length source electrode settings 0 -Not enabled 1- Enabled
	uint8_t sinkElecs[3]; //24 bit length sink electrode settings 
	int currentInMa;
	int pulseFrequency;  	//Freqncy of stimulation
	float  pulsePhase; 		//Active time of pulse in Microseconds
	int cyclesHoldM;   		//Number of pulses during hols
	int cyclesFadeL;			//Number of pulses in Onset and Offset
	int cyclesDelayK;			//Number of pulses in off state
	int seqCountN;				//Total number of stimulation trains
} STIMULATION_TypeDef;


/*
This function parses the stimulation parameter received from the app.
It initialize the stimulation parameter structure from the values received in the string.
*/
void MPSTM_StimulationParser(char * stimationParams);
/*
This function is to be called before stimulation is started. 
This will power-up the shift register circuits. 
To switch on power to shift registers set PC4 pin to high otherwise to low.
*/
void MPSTM_PowerUpShiftReg(bool onOff);
/*
This function accept an integer value with bits set for those electrodes. 
It loads this value to the shift registers. But this function  will not load data to the output.
*/
void MPSTM_LoadShiftReg(uint8_t * SourceElec);
/*
This function loads the value to output latch from shift register ref shift register block diagram. 
To load shift register latch this function generate a pulse in the PC0 pin. 
Before generating the pulse make sure shift register output is tri-stated by setting PC2 pin low.
*/
void MPSTM_ShiftRegLatchLoad(void);
/*
This function is used to enable the output of shift register. It set PC2 to high.
*/
void MPSTM_ShiftRegOutputEnable(bool enable);
/*
To enable sink electrode ISTIM_LSx pins musts be kept in floating condition. 
When pull down OP-AMP will become turned off which in turn switch of the MOSFET used as the current sink.
Microcontroller pins configured as open collector with weak pull ups are used directly for driving ISTIM_LSx pins. 
Loop through each bit in the sinkElectrode and set or reset corresponding MicroController PINS.
*/
void MPSTM_EnableSinkElectrodes(uint8_t * sinkElectrodes);
/*
Set all sink electrode pins to ON satate pull down the OPAMP + pin to keep 
the sink transiston in off state
*/
void MPSTM_DisableAllSinkElectrodes();
/*
During Onset and Offset DAC values increments in staircase form. 
This function calculates the value which is incremented in each step of OnSet and Offset. 
According to circuit a 1 MV set on the DAC pin will cause a current limit of 1 ma on each electrode.
Assume a value of X produce 1 mv output on DAC. 

Set Current = N ma
OnSetPulses = L
deltaDACValue = N*X/L

*/
void MPSTM_CalcDACDeltaValue(void);
/*
This function loads the value to the DAC.

*/
void MPSTM_SetDACValue(int32_t adcVal );

void MPSTM_CheckOverCurrentNStop(void);
/*
Initialize global variables and settings flags and start the stimulation timer. 
Stimulation is implemented as a simple state machine. 
Timer function handles most of the states. 
Assumes that Stimulation Global Structure is populated before calling this function.

*/
void MPSTM_StartStimulation(void);
/*
This is called from stimulation timer interrupt service routine .
Most of the work is done from here based on state variable.
*/
void MPSTM_OnStimulationTimer(void);

void MPSTM_StimulationTimerInit();

void MPSTM_OnStimTimerPulseSourcePhaseStart();
void MPSTM_OnStimTimerPulseSinkPhaseStart();
void MPSTM_OnStimTimerPulsePhaseEnd();
#endif