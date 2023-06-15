import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import lock from "../assets/lock-button.png";
import { useState } from "react";
import { api } from "../api/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async () => {
    if (!email) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .get("/accounts/generate-token/email", {
          params: {
            email,
          },
        })
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
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
    }
  };

  return (
    <>
      <Box>
        <Center h={"100vh"}>
          <Flex
            my={3}
            bg={"white"}
            flexDir={"column"}
            w={"350px"}
            // h={"100vh"}
            border={"1px"}
            borderColor={"#ababab"}
          >
            <Flex justifyContent={"center"} align={"center"} mt={5}>
              <Box boxSize={100}>
                <Image src={lock} />
              </Box>
            </Flex>

            <Flex
              px={10}
              gap={5}
              flexDir={"column"}
              textAlign={"center"}
              fontSize={12}
              pt={5}
            >
              <Text fontWeight={"bold"}>Trouble logging in?</Text>
              <Text>
                Enter your email and we'll send you a link to get back into your
                account.
              </Text>
              <Flex flexDir={"column"} gap={2}>
                <Input
                  id="email"
                  variant={"filled"}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
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
                      forgotPassword();
                    }, 2000);
                  }}
                >
                  Send login link
                </Button>
              </Box>
              <Flex alignItems={"center"} gap={2}>
                <Box w={"45%"} h={0.2} bg={"black"} />
                <Box fontSize={10} w={"10%"}>
                  OR
                </Box>
                <Box w={"45%"} h={0.2} bg={"black"} />
              </Flex>

              <Link to={"/register"}>
                <Text
                  textAlign={"center"}
                  fontSize={10}
                  mb={5}
                  _hover={{
                    textDecoration: "underline",
                    textColor: "blue.400",
                  }}
                >
                  Create new Account
                </Text>
              </Link>
            </Flex>
            <Link to={"/login"}>
              <Button borderRadius={0} w={"100%"}>
                Back to login
              </Button>
            </Link>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
