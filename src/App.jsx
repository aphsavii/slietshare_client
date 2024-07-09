import React from "react";
import {
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { useSelector } from "react-redux";
import MsgDialog from "./components/popups/MsgDialog.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect, useContext, Suspense } from "react";
import { SocketContext } from "./api/sockets/socket.jsx";

// Route imports
import AuthRoutes from "./components/routes/AuthRoutes/AuthRoutes.jsx";
import AdminRoutes from "./components/routes/AdminRoutes/AdminRoutes.jsx";
import Login from "./pages/Auth/Login.jsx";
import FullScreenLoader from "./components/Loaders/FullScreenLoader.jsx";
import UserProfileSkeleton from "./components/skeletons/UserProfileSkeleton.jsx";

// Lazy Loaded Routes
// import QsShare from "./pages/QsShare/QsShare";
const QsShare = React.lazy(() => import("@/pages/QsShare/QsShare"));
const UploadQs = React.lazy(() => import("@/pages/upload/UploadQs"));
const Admin = React.lazy(() => import("@/pages/Admin/Admin"));
const UserQs = React.lazy(() => import("@/pages/userProfile/UserQs"));
const UserProfile = React.lazy(() => import("@/pages/userProfile/UserProfile"));
const Me = React.lazy(() => import("@/pages/userProfile/Me"));
const Feed = React.lazy(() => import("@/pages/home/Feed"));

const PageNotFound = React.lazy(() =>
  import("@/components/errors/PageNotFound.jsx")
);
const NotAuthenticated = React.lazy(() =>
  import("@/pages/Auth/NotAuthenticated.jsx")
);
const NotAdmin = React.lazy(() => import("@/pages/Auth/NotAdmin.jsx"));
const Register = React.lazy(() => import("@/pages/Auth/Register.jsx"));
const ForgotPassword = React.lazy(() =>
  import("@/pages/Auth/ForgotPassword.jsx")
);

// Route definitions
const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* Non Authenticated Routes */}
    <Route path="login" element={<Login />} />
    <Route
      path="register"
      element={
        <Suspense fallback={FullScreenLoader}>
          <Register />
        </Suspense>
      }
    />
    <Route
      path="forgot-password"
      element={
        <Suspense fallback={FullScreenLoader}>
          <ForgotPassword />
        </Suspense>
      }
    />

    {/* Admin Routes */}
    <Route element={<AdminRoutes />}>
      <Route
        path="admin"
        element={
          <Suspense>
            <Admin />
          </Suspense>
        }
      />
    </Route>

    {/* Authenticated Routes */}
    <Route element={<AuthRoutes />}>
      <Route
        path=""
        element={
          <Suspense fallback={<FullScreenLoader text={`Loggin you in...`} />}>
            <Feed />
          </Suspense>
        }
      />
      <Route
        path="qs"
        element={
          <Suspense fallback={<FullScreenLoader />}>
            <QsShare />
          </Suspense>
        }
      />
      <Route path="qs/upload" element={<UploadQs />} />
      <Route
        path="user/:regno"
        element={
          <Suspense fallback={<UserProfileSkeleton />}>
            <UserProfile />
          </Suspense>
        }
      />
      <Route path="qs/:regno" element={<UserQs />} />
      <Route
        path="me"
        element={
          <Suspense fallback={<UserProfileSkeleton />}>
            <Me />
          </Suspense>
        }
      />
    </Route>

    {/* Error Routes */}
    <Route
      path="*"
      element={
        <Suspense fallback={FullScreenLoader}>
          <PageNotFound />
        </Suspense>
      }
    />
    <Route
      path="noAuth"
      element={
        <Suspense fallback={FullScreenLoader}>
          <NotAuthenticated />
        </Suspense>
      }
    />
    <Route
      path="notAdmin"
      element={
        <Suspense fallback={FullScreenLoader}>
          <NotAdmin />
        </Suspense>
      }
    />
  </Route>
);

// App component
function App() {
  const router = createBrowserRouter(routes);
  const appLoading = useSelector((state) => state.loading.appLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Dialogs
  const isDialog = localStorage.getItem("msgDialog") ? false : true;

  return (
    <>
      {appLoading ? (
        <FullScreenLoader text={`Hang on we're just right there...`} />
      ) : (
        <RouterProvider router={router} />
      )}
      <MsgDialog
        title="Important Note"
        active={isDialog}
        text="We've just started and there's not much of the data of question papers around here. So, please do upload some if you have previous papers and please make sure to upload upcoming papers as well. We help our juniors, our seniors will help us. Together we Can..."
      />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
