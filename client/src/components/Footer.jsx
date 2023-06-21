import {
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlinePlusSquare, AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewPost from "./newPost";

export default function Footer({ fetchPost }) {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Center
        id="footer"
        w={"100vw"}
        h="48px"
        borderTop={"1px"}
        zIndex={1}
        position={"fixed"}
        bottom={0}
      >
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"48px"}
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
