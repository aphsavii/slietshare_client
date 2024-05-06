import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/noAuth' />
  )
}

export default AuthRoutes;