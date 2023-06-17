import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { api } from "../api/api";

export default function PopupVerif() {
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const resendVerification = async () => {
    await api.get("/accounts/resendVerif/" + userSelector.email).then((res) => {
      console.log(res.data);
      toast({
        title: res.data.message,
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      {/* <Center> */}
      <Center
        w={"100vw"}
        // maxW={"470px"}
        bg={"red.400"}
        justifyContent={"center"}
        py={1}
        color={"white"}
        position={"fixed"}
        top={"44px"}
        zIndex={1}
      >
        <Flex fontSize={"12px"}>
          Your account has not been verified,
          <Text
            mx={2}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline", color: "blue.200" }}
            onClick={resendVerification}
          >
            click here
          </Text>
          to be verified
        </Flex>
      </Center>
      {/* </Center> */}
    </>
  );
}
