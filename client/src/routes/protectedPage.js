import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    console.log(userSelector);
    if (guestOnly && userSelector.username) {
      return nav("/home");
    } else if (needLogin && !userSelector.username) {
      return nav("/login");
    }
  }, [userSelector, needLogin]);

  return children;
}
