import { Flex } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <>
      <Flex
        flexDir={"column"}
        w={"80px"}
        h={"100vh"}
        // left={0}
        position={"fixed"}
        zIndex={1}
        bg={"black"}
      ></Flex>
    </>
  );
}
