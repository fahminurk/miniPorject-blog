import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TbAlertCircleFilled } from "react-icons/tb";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function ChangePasswordPage() {
  YupPassword(Yup);
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  // console.log(token);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required(
          "Minimum 8 characters and use capital letters, numbers and symbols"
        )
        .min(8, "password of at least 8 characters")
        .minUppercase(1, "password must have at least 1 capital letter")
        .minNumbers(1, "Password must have at least 1 number")
        .minSymbols(1, "Password must have at least 1 symbol"),
      confirmPassword: Yup.string()
        .required("confirm your password")
        .oneOf([Yup.ref("password"), null], "passwords don't match"),
    }),
    onSubmit: async () => {
      const { password } = formik.values;
      const user1 = { password };

      await api
        .patch("/accounts/forgot-password", user1, {
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
          return nav("/login");
        })
        .catch((err) => {
          toast({
            title: err.response.data,
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    const pathToken = location.pathname.split("/")[2];
    fetchUser(pathToken);
    setToken(pathToken);
  }, []);

  const fetchUser = async (token) => {
    try {
      await api("/accounts/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  function inputHandler(e) {
    const { value, id } = e.target;
    formik.setFieldValue(id, value);
  }

  return (
    <>
      {user.id ? (
        <Box>
          <Center h={"100vh"}>
            <Flex
              my={3}
              bg={"white"}
              flexDir={"column"}
              w={"350px"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Flex
                px={10}
                gap={5}
                flexDir={"column"}
                textAlign={"center"}
                fontSize={15}
                py={5}
              >
                <Text fontWeight={"bold"}>Change password</Text>

                <Flex flexDir={"column"}>
                  {/* password */}
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
                  <Box w={"100%"} h={8}>
                    <Flex
                      fontSize={10}
                      color="red"
                      gap={1}
                      display={formik.errors.password ? "flex" : "none"}
                    >
                      <Center>
                        <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
                      </Center>
                      {formik.errors.password}
                    </Flex>
                  </Box>
                  {/* confirm password */}
                  <InputGroup size="md">
                    <Input
                      id="confirmPassword"
                      variant={"filled"}
                      placeholder="Confirm Password"
                      type={show1 ? "text" : "password"}
                      onChange={inputHandler}
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick1}>
                        {show1 ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Box w={"100%"} h={4}>
                    <Flex
                      fontSize={10}
                      color="red"
                      gap={1}
                      display={formik.errors.confirmPassword ? "flex" : "none"}
                    >
                      <Center>
                        <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
                      </Center>
                      {formik.errors.confirmPassword}
                    </Flex>
                  </Box>
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
                        formik.handleSubmit();
                      }, 2000);
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Center>
        </Box>
      ) : (
        <Box>
          <Center h={"100vh"}>
            <Text>Link has expired</Text>
          </Center>
        </Box>
      )}
    </>
  );
}
