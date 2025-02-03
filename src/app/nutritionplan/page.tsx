import Appointment from '@/components/Appointment'
import HealthyFoodAll from '@/pages/NutritionPlan/HealthyFoodAll'
import NutritionPlanBanner from '@/pages/NutritionPlan/NutritionPlanBanner'
import React from 'react'

export default function NutritionPlan() {
  return (
    <div className='space-y-4'>
        <NutritionPlanBanner></NutritionPlanBanner>
        <HealthyFoodAll></HealthyFoodAll>
        <Appointment></Appointment>
    </div>
  )
}
