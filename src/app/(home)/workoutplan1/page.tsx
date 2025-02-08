import Appointment from '@/components/Appointment'
import SelectWorkoutPlan from '@/pages/WorkoutPlan/SelectWorkoutPlan'
import WorkoutBanner from '@/pages/WorkoutPlan/WorkoutBanner'
import React from 'react'

export default function page() {
  return (
    <div className='space-y-8'>
        <WorkoutBanner></WorkoutBanner>
        <SelectWorkoutPlan></SelectWorkoutPlan>
        <Appointment></Appointment>
    </div>
  )
}
