import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
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
import { TbAlertCircleFilled } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { api } from "../api/api";

export default function RegisterPage() {
  YupPassword(Yup);
  const nav = useNavigate();
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Enter your email")
        .email(
          "This email is not valid. Make sure the writing is correct like example@email.com"
        ),
      username: Yup.string().required("Enter your username"),
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
      const { email, username, password } = formik.values;
      const user = { email, username, password };
      // setIsLoading(true);
      await api
        .post("/accounts", user)
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          nav("/login");
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
  // console.log(formik);
  function inputHandler(e) {
    const { value, id } = e.target;
    formik.setFieldValue(id, value);
  }

  return (
    <>
      <Box>
        <Center>
          <Flex flexDir={"column"}>
            <Flex
              my={3}
              bg={"white"}
              flexDir={"column"}
              w={"350px"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Image src={instagram} mt={10} mb={5} mx={20} />
              <Flex px={10} gap={5} flexDir={"column"}>
                <Text textAlign={"center"} fontSize={"15px"}>
                  Sign up to see photos and videos from your friends.
                </Text>
                <Button
                  size={"sm"}
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                >
                  Log in with Facebook
                </Button>

                <Flex alignItems={"center"} gap={2}>
                  <Box w={"45%"} h={0.2} bg={"black"} />
                  <Box fontSize={10} w={"10%"}>
                    OR
                  </Box>
                  <Box w={"45%"} h={0.2} bg={"black"} />
                </Flex>
                <Flex flexDir={"column"}>
                  {/* email */}
                  <Input
                    id="email"
                    variant={"filled"}
                    placeholder="Email"
                    onChange={inputHandler}
                  />
                  <Box w={"100%"} h={8}>
                    <Flex
                      fontSize={10}
                      color="red"
                      gap={1}
                      display={formik.errors.email ? "flex" : "none"}
                    >
                      <Center>
                        <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
                      </Center>
                      {formik.errors.email}
                    </Flex>
                  </Box>
                  {/* username */}
                  <Input
                    id="username"
                    variant={"filled"}
                    placeholder="Username "
                    onChange={inputHandler}
                  />
                  <Box w={"100%"} h={8}>
                    <Flex
                      fontSize={10}
                      color="red"
                      gap={1}
                      display={formik.errors.username ? "flex" : "none"}
                    >
                      <Center>
                        <Icon as={TbAlertCircleFilled} w="16px" h="16px" />
                      </Center>
                      {formik.errors.username}
                    </Flex>
                  </Box>
                  {/* password */}
                  <InputGroup size="md">
                    <Input
                      id="password"
                      variant={"filled"}
                      placeholder="Password"
                      type={show ? "text" : "password"}
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

                  <Box w={"100%"} h={8}>
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

                <Text fontSize={10} textAlign={"center"}>
                  People who use our service may have uploaded your contact
                  information to Instagram.
                  <Link to="">
                    <Text
                      color={"blue.500"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Learn More
                    </Text>
                  </Link>
                </Text>
                <Text fontSize={10} textAlign={"center"}>
                  By signing up, you agree to our Terms , Privacy Policy and
                  Cookies Policy .
                </Text>
              </Flex>
              <Box px={10} py={3}>
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
                  Daftar
                </Button>
              </Box>
            </Flex>
            <Flex
              bg={"white"}
              flexDir={"column"}
              w={"350px"}
              // h={"100vh"}
              border={"1px"}
              borderColor={"#ababab"}
            >
              <Flex justifyContent={"center"} gap={1} fontSize={15} p={5}>
                <Text>Have an account? </Text>
                <Link to={"/login"}>
                  <Text
                    textColor={"blue.400"}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log in
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
