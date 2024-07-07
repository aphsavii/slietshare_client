import { Outlet, Navigate } from 'react-router-dom';



const AuthRoutes = () => {
  // const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
 
  return (
    accessToken ? <Outlet /> : <Navigate to='/noAuth' />
  )
}

export default AuthRoutes;