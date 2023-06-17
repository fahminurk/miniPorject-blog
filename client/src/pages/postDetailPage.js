import { useEffect, useState } from "react";

import { api } from "../api/api";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import { NavbarPhoto } from "../components/navbarProfile";
import { useSelector } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import DeletePost from "../components/deletePost";
import EditPost from "../components/editPost";

export default function PostDetailPage() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  const DeleteModal = useDisclosure();
  const EditModal = useDisclosure();
  // const [deleteId, setDeleteId] = useState();
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
      <NavbarPhoto />
      <Center>
        <Box flexDir={"column"} pt={"44px"} pb={"50px"}>
          <Flex
            w={"100vw"}
            maxW={"470px"}
            p={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderInline={"1px"}
          >
            <Box>
              <Avatar />
            </Box>
            <Text>{userSelector.username}</Text>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  size={"lg"}
                  icon={<CiMenuKebab />}
                ></MenuButton>
                <MenuList>
                  <MenuItem onClick={EditModal.onOpen}>
                    Edit
                    <EditPost
                      isOpen={EditModal.isOpen}
                      onClose={EditModal.onClose}
                      id={post.id}
                      caption={post.caption}
                      fetch={fetchPost}
                    />
                  </MenuItem>
                  <MenuItem onClick={DeleteModal.onOpen}>
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
            border={"1px"}
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
          <Flex px={1} borderInline={"1px"}>
            Liked by
          </Flex>
          <Flex gap={2} border={"1px"} px={1}>
            <Text fontWeight={"bold"}>{userSelector.username}</Text>
            <Text>{post.caption}</Text>
          </Flex>
        </Box>
      </Center>
      <Footer />
    </>
  );
}

// <Image as={CiMenuKebab} size={"lg"} />
