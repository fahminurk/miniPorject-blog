import {
  Text,
  Box,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../App";

export default function NavbarProfile() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Center
        id="navbarProfile"
        // bg={"black"}
        w={"100vw"}
        h="44px"
        borderBottom={"1px "}
        zIndex={2}
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
          {/* <Flex alignItems={"center"}>
            <Text>{userSelector.username}</Text>
            <Icon as={BiChevronDown} />
          </Flex> */}
          <Menu>
            <MenuButton
              variant={"outline"}
              color={theme === "light" ? "black" : "white"}
              bg={theme === "light" ? "white" : "black"}
              borderColor={theme === "light" ? "black" : "white"}
              // _active={theme === "light" ? "black" : "white"}
              _active={
                theme === "light"
                  ? { bg: "black", color: "white" }
                  : { bg: "white", color: "black" }
              }
              _hover={
                theme === "light"
                  ? { bg: "black", color: "white" }
                  : { bg: "white", color: "black" }
              }
              size={"sm"}
              as={Button}
              rightIcon={<BiChevronDown />}
            >
              {userSelector.username}
            </MenuButton>
            <MenuList p={0} minW={"110px"}>
              <MenuItem
                borderRadius={5}
                bg={theme === "light" ? "black" : "white"}
                color={theme === "light" ? "white" : "black"}
                _hover={
                  theme === "light"
                    ? { bg: "white", color: "black" }
                    : { bg: "black", color: "white" }
                }
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("theme");
                  dispatch({
                    type: "logout",
                  });
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
          <Box>
            <Icon boxSize={"25px"} as={AiOutlineUsergroupAdd} />
          </Box>
        </Flex>
      </Center>
    </>
  );
}

export function NavbarPhoto() {
  return (
    <>
      <Center
        id="navbarProfile"
        // bg={"white"}
        w={"100vw"}
        h="44px"
        borderBottom={"1px"}
        // borderColor={"white"}
        zIndex={2}
        position={"fixed"}
        top={0}
      >
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"44px"}
          alignItems={"center"}
          px={3}

          // border={"1px"}
        >
          <Link to="/profile">
            <Icon boxSize={"25px"} as={MdArrowBackIos} />
          </Link>
          <Center>
            <Flex alignItems={"center"}>
              <Text>Photo</Text>
            </Flex>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
