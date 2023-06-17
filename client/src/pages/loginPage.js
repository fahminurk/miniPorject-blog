import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import instagram from "../assets/Instagram_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { api } from "../api/api";
import { useDispatch } from "react-redux";

export default function LoginPage() {
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
      // setIsLoading(true);

      await api
        .post("/accounts/login", user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data.token));
          token = res.data.token;
        })
        .catch((err) => {
          // console.log(err.response);
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
      <Box>
        <Center h={"100vh"}>
          <Flex flexDir={"column"}>
            <Flex
              my={3}
              bg={"white"}
              flexDir={"column"}
              w={"350px"}
              // h={"100vh"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Image src={instagram} mt={10} mb={5} mx={20} />
              <Flex px={10} gap={5} flexDir={"column"}>
                <Flex flexDir={"column"} gap={5}>
                  <Input
                    id="usernameOrEmail"
                    variant={"filled"}
                    placeholder=" Email or username "
                    onChange={inputHandler}
                  />

                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      id="password"
                      variant={"filled"}
                      placeholder="Password"
                      onChange={inputHandler}
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
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
                  <Box w={"45%"} h={0.2} bg={"black"} />
                  <Box fontSize={10} w={"10%"}>
                    OR
                  </Box>
                  <Box w={"45%"} h={0.2} bg={"black"} />
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
              bg={"white"}
              flexDir={"column"}
              w={"350px"}
              // h={"100vh"}
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
