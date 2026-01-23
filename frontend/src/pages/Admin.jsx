import Admin from '@/components/AdminDashboard/Admin';
import { AdminProtectedRoute } from '@/utils/ProtectedRoute';

export default function AdminPage({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {
  return(
  <AdminProtectedRoute>
   <Admin setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  </AdminProtectedRoute>
  );
  }