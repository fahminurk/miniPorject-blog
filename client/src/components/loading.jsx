import { Center, Image } from "@chakra-ui/react";
import icon from "../assets/loading.png";

export default function Loading() {
  return (
    <Center h={"100vh"}>
      <Image src={icon} w={"40px"} />
    </Center>
  );
}
