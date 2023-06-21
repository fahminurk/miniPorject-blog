import {
  Box,
  Center,
  Flex,
  Icon,
  useColorMode,
  Image,
  Text,
} from "@chakra-ui/react";
import instagram_lightmode from "../assets/Instagram_logo.png";
import instagram_darkmode from "../assets/Instagram_logo_darkmode.png";
import { Switch } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { FiSun, FiMoon } from "react-icons/fi";

export default function NavbarHome() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Center
        id="navbarHome"
        w={"100vw"}
        h="44px"
        borderBottom={"1px"}
        zIndex={1}
        position={"fixed"}
        top={0}
      >
        <Flex
          w={"100vw"}
          maxW={"470px"}
          h={"44px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
        >
          <Box w={"100px"}>
            <Image
              id="logo"
              src={theme === "light" ? instagram_lightmode : instagram_darkmode}
            />
          </Box>

          <Flex id="switch" align={"center"} gap={3}>
            {/* <Text fontSize={10}>
              {theme === "light" ? "Light mode" : "Dark mode"}
            </Text> */}
            <Icon as={FiSun} />
            <Switch
              colorScheme="cyan"
              onChange={toggleTheme}
              defaultChecked={theme === "dark" ? true : false}
              // Icon={theme === "dark" ? <FiSun /> : <FiMoon />}
            />
            <Icon as={FiMoon} />
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
