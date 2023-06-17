import {
  Avatar,
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import instagram from "../assets/Instagram_logo.png";
import love from "../assets/love.png";
import { AiOutlinePlusSquare, AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewPost from "./newPost";
import { api } from "../api/api";
import { useState } from "react";

export default function Footer() {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [post, setPost] = useState([]);

  const fetchPost = async () => {
    await api.get("/posts/" + userSelector.id).then((res) => {
      // console.log(res.data);
      setPost(res.data);
    });
  };
  return (
    <>
      <Center
        bg={"white"}
        w={"100vw"}
        h="48px"
        border={"1px solid black"}
        zIndex={1}
        position={"fixed"}
        bottom={0}
      >
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"48px"}
          // position={"fixed"}
          // bottom={0}
          border
          // zIndex={1}
          justifyContent={"space-around"}
          alignItems={"center"}
          px={3}
        >
          <Link to="/home">
            <Box boxSize={8}>
              <Image as={AiOutlineHome} size={"lg"} />
            </Box>
          </Link>

          <Box boxSize={8}>
            <Image as={MdOutlineExplore} size={"lg"} />
          </Box>
          <Box boxSize={8}>
            <Image as={BiMoviePlay} size={"lg"} />
          </Box>
          <Box boxSize={8} onClick={onOpen}>
            <Image as={AiOutlinePlusSquare} size={"lg"} />
            <NewPost isOpen={isOpen} onClose={onClose} fetch={fetchPost} />
          </Box>
          <Box boxSize={8}>
            <Image as={IoPaperPlaneOutline} size={"lg"} />
          </Box>
          <Link to="/profile">
            <Box boxSize={8}>
              <Avatar size={"sm"} src={userSelector.avatar_url} />
            </Box>
          </Link>
        </Flex>
      </Center>
    </>
  );
}
