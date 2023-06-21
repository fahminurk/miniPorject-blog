import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import DeletePost from "../components/deletePost";
import EditPost from "../components/editPost";
import { ThemeContext } from "../App";
import { useContext } from "react";

export default function PostDetailPage() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  const DeleteModal = useDisclosure();
  const EditModal = useDisclosure();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    await api.get("/posts/post/" + id).then((res) => {
      console.log(res.data);
      setPost(res.data);
    });
  }

  return (
    <>
      <Center>
        <Box flexDir={"column"} pt={"44px"} h={"100vh"} borderInline={"1px"}>
          <Flex
            w={"100vw"}
            maxW={"470px"}
            p={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Avatar src={userSelector.avatar_url} />
            </Box>
            <Text fontWeight={"bold"}>{userSelector.username}</Text>
            <Box>
              <Menu>
                <MenuButton mt={1}>
                  <Box boxSize={8}>
                    <Image as={CiMenuKebab} size={"sm"} />
                  </Box>
                </MenuButton>

                <MenuList p={0} minW={"110px"}>
                  <MenuItem
                    // borderRadius={5}
                    onClick={EditModal.onOpen}
                    bg={theme === "light" ? "black" : "white"}
                    color={theme === "light" ? "white" : "black"}
                    _hover={
                      theme === "light"
                        ? { bg: "white", color: "black" }
                        : { bg: "black", color: "white" }
                    }
                  >
                    Edit
                    <EditPost
                      isOpen={EditModal.isOpen}
                      onClose={EditModal.onClose}
                      id={post.id}
                      caption={post.caption}
                      fetch={fetchPost}
                    />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={DeleteModal.onOpen}
                    // borderRadius={5}
                    bg={theme === "light" ? "black" : "white"}
                    color={theme === "light" ? "white" : "black"}
                    _hover={
                      theme === "light"
                        ? { bg: "white", color: "black" }
                        : { bg: "black", color: "white" }
                    }
                  >
                    Delete
                    <DeletePost
                      isOpen={DeleteModal.isOpen}
                      onClose={DeleteModal.onClose}
                      id={post.id}
                      fetch={fetchPost}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
          <Flex
            flexDir={"column"}
            w={"100vw"}
            maxW={"470px"}
            borderTop={"1px"}
            gap={3}
          >
            <Box maxW={"470px"} maxH={"470px"} h={"100vh"}>
              <Image
                src={post.image}
                objectFit={"cover"}
                w={"100%"}
                h={"100%"}
              />
            </Box>
          </Flex>
          <Flex px={1} borderTop={"1px"}>
            {post.likes} {post.likes <= 1 ? "Like" : "Likes"}
          </Flex>
          <Flex gap={2} px={1} borderY={"1px"}>
            <Text fontWeight={"bold"}>{userSelector.username}</Text>
            <Text>{post.caption}</Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
