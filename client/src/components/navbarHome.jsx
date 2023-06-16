import { Box, Center, Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import instagram from "../assets/Instagram_logo.png";
import love from "../assets/love.png";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function NavbarHome() {
  return (
    <>
      <Center
        bg={"white"}
        w={"100vw"}
        h="44px"
        border={"1px solid black"}
        zIndex={1}
        position={"fixed"}
        top={0}
      >
        {/* <Flex justifyContent={"center"}> */}
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"44px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
          // mr={6}
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
        {/* </Flex> */}
      </Center>
    </>
  );
}
