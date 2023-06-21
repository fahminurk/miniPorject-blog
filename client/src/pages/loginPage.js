import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import instagram_lightmode from "../assets/Instagram_logo.png";
import instagram_darkmode from "../assets/Instagram_logo_darkmode.png";
import { ThemeContext } from "@emotion/react";

export default function LoginPage() {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const toast = useToast();
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: "",
  });

  function inputHandler(e) {
    const { value, id } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  }

  const login = async () => {
    let token;

    if (!user.usernameOrEmail || !user.password) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/accounts/login", user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.token));
          token = res.data.token;
        })
        .catch((err) => {
          toast({
            title: err.response.data,
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        });

      await api
        .get("/accounts/token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: "login",
            payload: res.data,
          });
          toast({
            title: "Success login",
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          return nav("/home");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Box id="login">
        <Center h={"100vh"}>
          <Flex flexDir={"column"}>
            <Flex
              my={3}
              flexDir={"column"}
              w={"350px"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Image
                src={
                  theme === "light" ? instagram_lightmode : instagram_darkmode
                }
                mt={10}
                mb={5}
                mx={20}
              />
              <Flex px={10} gap={5} flexDir={"column"}>
                <Flex flexDir={"column"} gap={5}>
                  <Input
                    id="usernameOrEmail"
                    placeholder=" Email or username "
                    onChange={inputHandler}
                  />

                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      onChange={inputHandler}
                    />
                    <InputRightAddon width="2.7rem" p={0}>
                      <Button size="sm" onClick={handleClick}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </Flex>
                <Box>
                  <Button
                    isLoading={isLoading}
                    w={"100%"}
                    size={"sm"}
                    colorScheme="blue"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        login();
                      }, 2000);
                    }}
                  >
                    Log in
                  </Button>
                </Box>
                <Flex alignItems={"center"} gap={2}>
                  <Box
                    w={"45%"}
                    h={0.2}
                    bg={theme == "dark" ? "black" : "white"}
                  />
                  <Box fontSize={10} w={"10%"}>
                    OR
                  </Box>
                  <Box
                    w={"45%"}
                    h={0.2}
                    bg={theme == "dark" ? "black" : "white"}
                  />
                </Flex>

                <a href="https://www.facebook.com/login">
                  <Button
                    w={"100%"}
                    size={"sm"}
                    colorScheme="facebook"
                    leftIcon={<FaFacebook />}
                  >
                    Log in with Facebook
                  </Button>
                </a>

                <Link to="/forgot-password">
                  <Text
                    _hover={{
                      textDecoration: "underline",
                      textColor: "blue.400",
                    }}
                    textAlign={"center"}
                    fontSize={10}
                    mb={5}
                  >
                    Forgot password?
                  </Text>
                </Link>
              </Flex>
            </Flex>
            {/*  */}
            <Flex
              flexDir={"column"}
              w={"350px"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Flex justifyContent={"center"} gap={1} fontSize={15} p={5}>
                <Text>Don't have an account? </Text>
                <Link to={"/signup"}>
                  <Text
                    textColor={"blue.400"}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign up
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
