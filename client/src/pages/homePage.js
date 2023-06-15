import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import NavbarHome from "../components/navbarHome";
import { CiMenuKebab } from "react-icons/ci";
import { BsChat } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import love from "../assets/love.png";
import PopupVerif from "../components/popupVerif";
import { useSelector } from "react-redux";

export default function HomePage() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <NavbarHome />
      {userSelector.status == "unverified" ? <PopupVerif /> : null}

      <Box>
        <Center>
          <Flex
            flexDir={"column"}
            w={"470px"}
            h={"1000px"}
            p={2}
            pt={"80px"}
            border={"1px"}
          >
            <Flex
              justifyContent={"space-between"}
              align={"center"}
              p={1}
              // border={"1px"}
              borderInline={"1px"}
              borderTop={"1px"}
            >
              <Flex gap={3} w={"90%"}>
                <Box>
                  <Avatar />
                </Box>
                <Box flexDir={"column"}>
                  <Flex gap={1}>
                    <Text>{userSelector.username}</Text>-<Text>21h</Text>
                  </Flex>

                  <Text>sasdsaf</Text>
                </Box>
              </Flex>
              <Box boxSize={8}>
                <Image as={CiMenuKebab} size={"lg"} />
              </Box>
            </Flex>

            <Box w={"100%"} h={"470px"} border={"1px"}></Box>

            <Flex
              h={"40px"}
              w={"100%"}
              borderInline={"1px"}
              gap={2}
              align={"center"}
              p={2}
              justifyContent={"space-between"}
            >
              <Flex align={"center"} gap={5}>
                <Box boxSize={6} mt={1.5}>
                  <Image src={love} />
                </Box>
                <Box boxSize={6}>
                  <Image as={BsChat} size={"lg"} />
                </Box>
                <Box boxSize={6}>
                  <Image as={IoPaperPlaneOutline} size={"lg"} />
                </Box>
              </Flex>

              <Box boxSize={6}>
                <Image as={BsBookmark} size={"lg"} />
              </Box>
            </Flex>
            <Flex border={"1px"} px={2} gap={2}>
              <Text>Liked by </Text>
              <Text fontWeight={"bold"}>jenniebyjane</Text>
              <Text>and</Text>
              <Text fontWeight={"bold"}>2.319.654 others</Text>
            </Flex>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
