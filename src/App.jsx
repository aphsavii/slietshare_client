import { RouterProvider, Route, createRoutesFromElements,  createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import { useSelector } from 'react-redux';
import AppLoading from './components/Loaders/AppLoading.jsx';
import MsgDialog from './components/popups/MsgDialog.jsx';
import { Toaster } from 'react-hot-toast';

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
import UserQs from './pages/userProfile/UserQs.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';

// Route definitions
const routes = createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    {/* Non Authenticated Routes */}
    <Route path="" element={< QsShare />} />
    <Route path="login" element={< Login />} />
    <Route path="register" element={< Register />} />
    <Route path="forgot-password" element={< ForgotPassword />} />

    {/* Admin Routes */}
    <Route element={<AdminRoutes />}>
      <Route path="admin" element={<Admin />} />
    </Route>

    {/* Authenticated Routes */}
    <Route element={<AuthRoutes />}>
      <Route path="qs/upload" element={< UploadQs />} />
      <Route path="user/:regno" element={< UserQs />} />
    </Route>

    {/* Error Routes */}
    <Route path="*" element={<PageNotFound />} />
    <Route path="noAuth" element={<NotAuthenticated />} />
    <Route path='notAdmin' element={<NotAdmin />} />
  </Route>
);

// App component
function App() {
  const router = createBrowserRouter(routes);
  const appLoading = useSelector((state) => state.loading.appLoading);


  // Dialogs
  const isDialog = localStorage.getItem('msgDialog') ? false : true;


  return (
    <>
      {appLoading ? <AppLoading /> : <RouterProvider router={router} />}
      <MsgDialog title="Important Note" active={isDialog} text="We've just started and there's not much of the data of question papers around here. So, please do upload some if you have previous papers and please make sure to upload upcoming papers as well. We help our juniors, our seniors will help us. Together we Can..." />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
