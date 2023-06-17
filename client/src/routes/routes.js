import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import HomePage from "../pages/homePage";
import ForgotPasswordPage from "../pages/forgotPasswordPage";
import ChangePasswordPage from "../pages/changePasswordPage";
import ProtectedPage from "./protectedPage";
import VerifPage from "../pages/verifPage";
import PostDetailPage from "../pages/postDetailPage";

const routes = [
  <Route
    path="/signup"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/post/:id"
    element={
      <ProtectedPage needLogin={true}>
        <PostDetailPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/forgot-password"
    element={
      <ProtectedPage guestOnly={true}>
        <ForgotPasswordPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/home"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/forgot-password/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <ChangePasswordPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/update-verif/:token"
    element={
      <ProtectedPage needLogin={true}>
        <VerifPage />
      </ProtectedPage>
    }
  />,

  <Route
    path="/*"
    element={<ProtectedPage needLogin={true} guestOnly={true} />}
  />,
];

export default routes;
