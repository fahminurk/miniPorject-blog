import { Box, Center, Text } from "@chakra-ui/react";

export default function PopupVerif() {
  return (
    <>
      <Center>
        <Box
          w={"100vw"}
          // maxW={"470px"}
          bg={"red.400"}
          textAlign={"center"}
          py={1}
          color={"white"}
          cursor={"pointer"}
          position={"fixed"}
          top={"44px"}
          zIndex={1}
        >
          Your account has not been verified, click here to be verified{" "}
        </Box>
      </Center>
    </>
  );
}
