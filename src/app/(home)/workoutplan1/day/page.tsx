import Appointment from '@/components/Appointment'
import DayBanner from '@/pages/dayRole/DayBanner'
import WorkoutDayPage from '@/pages/dayRole/WorkoutDayPage'
import React from 'react'

export default function day() {
  return (
    <div>
        <DayBanner></DayBanner>
        <WorkoutDayPage></WorkoutDayPage>
        <Appointment></Appointment>
    </div>
  )
}