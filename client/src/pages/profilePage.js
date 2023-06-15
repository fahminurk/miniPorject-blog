import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";

import img from "../assets/tzuyu1.jpg";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <Center>
        {/* <Box h={"100vh"}> */}
        <Flex flexDir={"column"}>
          <Flex w={"375px"} px={3} gap={3} border={"1px"} py={5}>
            <Box w={"100px"}>
              <Avatar size={"full"} />
            </Box>
            <Flex
              flexDir={"column"}
              w={"100%"}
              justifyContent={"space-between"}
            >
              <Flex>
                <Text fontSize={"20px"}> fahminurk</Text>
                <Box p={1}>
                  <Icon boxSize={"25px"} as={FiSettings} />
                </Box>
              </Flex>
              <Button size={"sm"}>Edit profile</Button>
            </Flex>
          </Flex>
          <Grid templateColumns={"repeat(3, 1fr)"} p={3} border={"1px"}>
            <Flex flexDir={"column"} textAlign={"center"}>
              <Text>9</Text>
              <Text>Posts</Text>
            </Flex>
            <Flex flexDir={"column"} textAlign={"center"}>
              <Text>98k</Text>
              <Text>followers</Text>
            </Flex>
            <Flex flexDir={"column"} textAlign={"center"}>
              <Text>0</Text>
              <Text>following</Text>
            </Flex>
          </Grid>
        </Flex>
        {/* </Box> */}
      </Center>
    </>
  );
}
