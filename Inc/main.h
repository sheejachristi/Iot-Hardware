/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.h
  * @brief          : Header for main.c file.
  *                   This file contains the common defines of the application.
  ******************************************************************************
  * @attention
  *
  * <h2><center>&copy; Copyright (c) 2019 STMicroelectronics.
  * All rights reserved.</center></h2>
  *
  * This software component is licensed by ST under BSD 3-Clause license,
  * the "License"; You may not use this file except in compliance with the
  * License. You may obtain a copy of the License at:
  *                        opensource.org/licenses/BSD-3-Clause
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Define to prevent recursive inclusion -------------------------------------*/
#ifndef __MAIN_H
#define __MAIN_H

#ifdef __cplusplus
extern "C" {
#endif

/* Includes ------------------------------------------------------------------*/
#include "stm32f4xx_hal.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */

/* USER CODE END Includes */

/* Exported types ------------------------------------------------------------*/
/* USER CODE BEGIN ET */

/* USER CODE END ET */

/* Exported constants --------------------------------------------------------*/
/* USER CODE BEGIN EC */

/* USER CODE END EC */

/* Exported macro ------------------------------------------------------------*/
/* USER CODE BEGIN EM */

/* USER CODE END EM */

/* Exported functions prototypes ---------------------------------------------*/
void Error_Handler(void);

/* USER CODE BEGIN EFP */

/* USER CODE END EFP */

/* Private defines -----------------------------------------------------------*/
#define STIM_HS_LOAD_Pin GPIO_PIN_0
#define STIM_HS_LOAD_GPIO_Port GPIOC
#define STIM_HS_OE_Pin GPIO_PIN_2
#define STIM_HS_OE_GPIO_Port GPIOC
#define STIM_HS_DIS_Pin GPIO_PIN_3
#define STIM_HS_DIS_GPIO_Port GPIOC
#define ISTIM_DACuc_Pin GPIO_PIN_4
#define ISTIM_DACuc_GPIO_Port GPIOA
#define STIM_HS_SCK_Pin GPIO_PIN_5
#define STIM_HS_SCK_GPIO_Port GPIOA
#define STIM_HS_MOSI_Pin GPIO_PIN_7
#define STIM_HS_MOSI_GPIO_Port GPIOA
#define STIM_HS_ENA_Pin GPIO_PIN_4
#define STIM_HS_ENA_GPIO_Port GPIOC
#define ISTIM_LS17_Pin GPIO_PIN_8
#define ISTIM_LS17_GPIO_Port GPIOE
#define ISTIM_LS18_Pin GPIO_PIN_9
#define ISTIM_LS18_GPIO_Port GPIOE
#define ISTIM_LS19_Pin GPIO_PIN_10
#define ISTIM_LS19_GPIO_Port GPIOE
#define ISTIM_LS20_Pin GPIO_PIN_11
#define ISTIM_LS20_GPIO_Port GPIOE
#define ISTIM_LS21_Pin GPIO_PIN_12
#define ISTIM_LS21_GPIO_Port GPIOE
#define ISTIM_LS22_Pin GPIO_PIN_13
#define ISTIM_LS22_GPIO_Port GPIOE
#define ISTIM_LS23_Pin GPIO_PIN_14
#define ISTIM_LS23_GPIO_Port GPIOE
#define ISTIM_LS24_Pin GPIO_PIN_15
#define ISTIM_LS24_GPIO_Port GPIOE
#define ISTIM_LS9_Pin GPIO_PIN_8
#define ISTIM_LS9_GPIO_Port GPIOD
#define ISTIM_LS10_Pin GPIO_PIN_9
#define ISTIM_LS10_GPIO_Port GPIOD
#define ISTIM_LS11_Pin GPIO_PIN_10
#define ISTIM_LS11_GPIO_Port GPIOD
#define ISTIM_LS12_Pin GPIO_PIN_11
#define ISTIM_LS12_GPIO_Port GPIOD
#define ISTIM_LS13_Pin GPIO_PIN_12
#define ISTIM_LS13_GPIO_Port GPIOD
#define ISTIM_LS14_Pin GPIO_PIN_13
#define ISTIM_LS14_GPIO_Port GPIOD
#define ISTIM_LS15_Pin GPIO_PIN_14
#define ISTIM_LS15_GPIO_Port GPIOD
#define ISTIM_LS16_Pin GPIO_PIN_15
#define ISTIM_LS16_GPIO_Port GPIOD
#define ISTIM_LS1_Pin GPIO_PIN_0
#define ISTIM_LS1_GPIO_Port GPIOD
#define ISTIM_LS2_Pin GPIO_PIN_1
#define ISTIM_LS2_GPIO_Port GPIOD
#define ISTIM_LS3_Pin GPIO_PIN_2
#define ISTIM_LS3_GPIO_Port GPIOD
#define ISTIM_LS4_Pin GPIO_PIN_3
#define ISTIM_LS4_GPIO_Port GPIOD
#define ISTIM_LS5_Pin GPIO_PIN_4
#define ISTIM_LS5_GPIO_Port GPIOD
#define ISTIM_LS6_Pin GPIO_PIN_5
#define ISTIM_LS6_GPIO_Port GPIOD
#define ISTIM_LS7_Pin GPIO_PIN_6
#define ISTIM_LS7_GPIO_Port GPIOD
#define ISTIM_LS8_Pin GPIO_PIN_7
#define ISTIM_LS8_GPIO_Port GPIOD
/* USER CODE BEGIN Private defines */

/* USER CODE END Private defines */

#ifdef __cplusplus
}
#endif

#endif /* __MAIN_H */

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
