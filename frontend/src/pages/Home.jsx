import React from 'react'
import Landing from '@/components/Landing/Landing'
// import TeamComponent from '@/components/Team/Team'
export default function Home({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle, setDisplayNavbar, displayLogo, setDisplayLogo}) {
  return (
    <>
    <Landing setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} setDisplayNavbar={setDisplayNavbar} displayLogo={displayLogo} setDisplayLogo={setDisplayLogo}/>

    {/* just to test redndering of navbar and logo on landing, pls replace with appropriate component */}
    {/* <TeamComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} setDisplayNavbar={setDisplayNavbar} displayLogo={displayLogo} setDisplayLogo={setDisplayLogo}/> */}
    </>
  )
}