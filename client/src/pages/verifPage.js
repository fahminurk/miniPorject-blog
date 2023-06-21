import { Center, useToast } from "@chakra-ui/react";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifPage() {
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  const toast = useToast();
  const nav = useNavigate();

  const fetchUser = async (token) => {
    try {
      await api("/accounts/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setUser(res.data);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const pathToken = location.pathname.split("/")[2];
    fetchUser(pathToken);
    setToken(pathToken);
  }, []);

  const patchStatus = async () => {
    try {
      await api
        .patch("/accounts/update-verif", user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      patchStatus();
      return nav("/home");
    }, 2000);
  });

  return (
    <>
      <Center h={"100vh"}>Success, your account has been verified!</Center>
    </>
  );
}
