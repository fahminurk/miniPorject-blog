import { Text, Box, Center, Flex, Icon } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
export default function NavbarProfile() {
  const userSelector = useSelector((state) => state.auth);
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
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"44px"}
          // position={"fixed"}
          // top={0}
          // zIndex={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
          // border={"1px"}
        >
          <Box>
            <Icon boxSize={"25px"} as={FiSettings} />
          </Box>
          <Flex alignItems={"center"}>
            <Text>{userSelector.username}</Text>
            <Icon as={BiChevronDown} />
          </Flex>
          <Box>
            <Icon boxSize={"25px"} as={AiOutlineUsergroupAdd} />
          </Box>
        </Flex>
      </Center>
    </>
  );
}
