import React from 'react'
import DashboardComponent from '@/components/Dashboard/Dashboard'
import {ProtectedRoute} from '@/utils/ProtectedRoute';
import SmoothScroll from '@/utils/smoothScroll';

export default function Dashboard({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return(
  <ProtectedRoute>
  <SmoothScroll>
  <DashboardComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  </SmoothScroll>
  </ProtectedRoute>
  );
}