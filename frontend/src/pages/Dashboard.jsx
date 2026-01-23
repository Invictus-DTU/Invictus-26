import React from 'react'
import DashboardComponent from '@/components/Dashboard/Dashboard'
import {ProtectedRoute} from '@/utils/ProtectedRoute';

export default function Dashboard({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return(
  <ProtectedRoute>
  <DashboardComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  </ProtectedRoute>
  );
}