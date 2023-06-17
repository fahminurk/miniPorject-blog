import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
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
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import moment from "moment/moment";

export default function HomePage() {
  const userSelector = useSelector((state) => state.auth);
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    await api.get("/posts").then((res) => {
      console.log(res.data);
      setPost(res.data);
    });
  };

  return (
    <>
      <NavbarHome />
      {userSelector.status == "unverified" ? <PopupVerif /> : null}

      <Box>
        <Center>
          <Flex
            flexDir={"column"}
            w={"100vw"}
            maxW={"470px"}
            p={2}
            pt={"80px"}
            pb={"35px"}
            border={"1px"}
            // gap={2}
          >
            {post?.map((val) => {
              return (
                <>
                  <Box mb={5}>
                    <Flex
                      justifyContent={"space-between"}
                      align={"center"}
                      p={1}
                      // bg={"pink"}
                      borderInline={"1px"}
                      borderTop={"1px"}
                    >
                      <Flex gap={3} w={"90%"}>
                        <Box>
                          <Avatar src={val.user.avatar_url} />
                        </Box>
                        <Box flexDir={"column"}>
                          <Flex gap={1}>
                            <Text>{val.user.username}</Text>-
                            <Text>{val.date}</Text>
                          </Flex>

                          <Text>location</Text>
                        </Box>
                      </Flex>
                      <Box boxSize={8}>
                        <Image as={CiMenuKebab} size={"lg"} />
                      </Box>
                    </Flex>

                    <Box w={"100%"} maxH={"470px"} border={"1px"}>
                      <Image
                        objectFit={"contain"}
                        src={val.image}
                        h={"100vh"}
                        maxH={"470px"}
                        w={"100vw"}
                        // maxW={"470px"}
                      />
                    </Box>

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

                    <Flex borderInline={"1px"} px={2} gap={2}>
                      <Text fontWeight={"bold"}>{userSelector.username}</Text>
                      <Text>{val.caption}</Text>
                    </Flex>

                    <Box border={"1px"} px={2} gap={2}>
                      <Text textColor={"gray"} fontSize={"13px"}>
                        View all comment.length comments
                      </Text>
                    </Box>

                    <Flex borderInline={"1px"} px={2} gap={2}>
                      <Text fontWeight={"bold"}>dlwlrma</Text>
                      <Text>love u</Text>
                    </Flex>
                    <Box>
                      <Input
                        placeholder="Add a comment..."
                        borderRadius={0}
                        border={"1px"}
                        size={"sm"}
                      />
                    </Box>
                  </Box>
                </>
              );
            })}
          </Flex>
        </Center>
      </Box>
      <Footer />
    </>
  );
}
