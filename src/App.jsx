import { RouterProvider, Route, createRoutesFromElements, HashRouter, createHashRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import { loginSuccess, loginFailure } from './redux/slices/auth';
import { jwtDecode } from 'jwt-decode';
import userAuthService from './api/services/userAuthService.js';
import { useSelector, useDispatch } from 'react-redux';
import { setAppLoading } from './redux/slices/appLoading/index.js';
import Alert from './components/alerts/Alert.jsx';
import AppLoading from './components/Loaders/AppLoading.jsx';
import { useEffect } from 'react';
import MsgDialog from './components/popups/MsgDialog.jsx';

// Route imports
import AuthRoutes from './components/routes/AuthRoutes/AuthRoutes.jsx';
import AdminRoutes from './components/routes/AdminRoutes/AdminRoutes.jsx';
import QsShare from './pages/QsShare/QsShare';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import UploadQs from './pages/upload/UploadQs.jsx';
import PageNotFound from './components/errors/PageNotFound.jsx';
import NotAuthenticated from './pages/Auth/NotAuthenticated.jsx';
import NotAdmin from './pages/Auth/NotAdmin.jsx';
import Admin from './pages/admin/Admin.jsx';


// Route definitions
const routes = createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    <Route path="" element={< QsShare />} />
    <Route path="login" element={< Login />} />
    <Route path="register" element={< Register />} />

    {/* Admin Routes */}
    <Route element={<AdminRoutes />}>
      <Route path="admin" element={<Admin />} />
    </Route>

    {/* Authenticated Routes */}
    <Route element={<AuthRoutes />}>
      <Route path="qs/upload" element={< UploadQs />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
    <Route path="noAuth" element={<NotAuthenticated />} />
    <Route path='notAdmin' element={<NotAdmin />} />
  </Route>
);

// App component
function App() {
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));
  const refreshToken = localStorage.getItem('refreshToken');
  const isRefreshTokenValid = refreshToken && jwtDecode(refreshToken).exp > Date.now() / 1000;
  useEffect(() => {
    if (accessToken && user && isRefreshTokenValid) {
      dispatch(loginSuccess({ user, accessToken, refreshToken }));
      return;
    }
    if (isRefreshTokenValid && !accessToken) {
      dispatch(setAppLoading(true));
      userAuthService.refreshTokens().then((res) => {
        if (res?.user && res?.accessToken) {
          dispatch(loginSuccess({ user: res.user, accessToken: res.accessToken, refreshToken: res.refreshToken }));
        }
        dispatch(setAppLoading(false));
      }).catch((error) => {
        dispatch(setAppLoading(false));
        dispatch(loginFailure('Session expired'));
      })
    }
    else {
      dispatch(loginFailure('Session expired'));
    }
  }, []);


  const router = createHashRouter(routes);
  const appLoading = useSelector((state) => state.loading.appLoading);

  const { isError, errorMsg } = useSelector((state) => state.error);
  const { isSuccess, successMsg } = useSelector((state) => state.success);

  // Dialogs
  const isDialog = localStorage.getItem('msgDialog') ? false : true;


  return (
    <>
      {appLoading ? <AppLoading /> : <RouterProvider router={router} />}
      <MsgDialog title="Important Note" active={isDialog} text="We've just started and there's not much of the data of question papers around here. So, please do upload some if you have previous papers and please make sure to upload upcoming papers as well. We help our juniors, our seniors will help us. Together we Can..." />
      {isError && <Alert message={errorMsg} type="error" />}
      {isSuccess && <Alert message={successMsg} type="success" />}
    </>
  );
}

export default App;
