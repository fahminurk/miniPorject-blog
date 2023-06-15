import { Route } from "react-router-dom";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import HomePage from "../pages/homePage";
import ForgotPasswordPage from "../pages/forgotPasswordPage";
import ChangePasswordPage from "../pages/changePasswordPage";

const routes = [
  <Route path="/signup" element={<RegisterPage />} />,
  <Route path="/login" element={<LoginPage />} />,
  <Route path="/profile" element={<ProfilePage />} />,
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />,
  <Route path="/home" element={<HomePage />} />,
  <Route path="/forgot-password/:token" element={<ChangePasswordPage />} />,
];

export default routes;
