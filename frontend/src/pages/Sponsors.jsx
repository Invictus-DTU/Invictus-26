import React from 'react'
import SponsorComponent from "@/components/Sponsors/Sponsors"

export default function Sponsors({setLotusClass, setLotusStyle}) {
  return (
    <SponsorComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle}></SponsorComponent>
  )
}
