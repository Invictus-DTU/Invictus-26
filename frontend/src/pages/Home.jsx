import React from 'react'
import Landing from '@/components/Landing/Landing'
import FAQ from "@/components/FAQ/faq";
import Footer from "@/components/Footer/footer";

export default function Home({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <><Landing setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
    <FAQ setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
    <Footer setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle}/>
    </>
  )
}