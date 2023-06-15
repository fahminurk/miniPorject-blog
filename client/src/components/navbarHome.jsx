import { Box, Center, Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import instagram from "../assets/Instagram_logo.png";
import love from "../assets/love.png";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function NavbarHome() {
  return (
    <>
      <Center>
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"44px"}
          position={"fixed"}
          top={0}
          zIndex={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
          border={"1px"}
          bg={"white"}
        >
          <Box w={"100px"}>
            <Image src={instagram} />
          </Box>

          <Flex gap={5}>
            <Box boxSize={8}>
              <Image as={AiOutlinePlusSquare} size={"lg"} />
            </Box>
            <Box boxSize={8} mt={1}>
              <Image src={love} />
            </Box>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
