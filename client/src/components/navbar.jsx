import { Text, Box, Center, Flex, Icon } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
export default function Navbar() {
  return (
    <>
      <Center>
        <Flex
          w={"375px"}
          h={"44px"}
          position={"sticky"}
          top={0}
          zIndex={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
          border={"1px"}
        >
          <Box>
            <Icon boxSize={"25px"} as={FiSettings} />
          </Box>
          <Flex alignItems={"center"}>
            <Text>fahminurk</Text>
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
