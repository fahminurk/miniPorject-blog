import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import icon from "../assets/icon.png";

export default function NewPost(props) {
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(icon);
  const [selectedFile, setSelectedFile] = useState(null);
  const [post, setPost] = useState({
    caption: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempPost = { ...post };
    tempPost[id] = value;
    // console.log(tempPost);
    setPost(tempPost);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const uploudPost = async () => {
    if (!post.caption && selectedFile) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      const formData = new FormData();
      formData.append("post", selectedFile);
      formData.append("caption", post.caption);
      await api
        .post("/posts/new/" + userSelector.id, formData)
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          props.fetch();
          props.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal size={"xs"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
              />
              <Image
                src={image}
                w={"100vw"}
                maxW={"272px"}
                h={"100vh"}
                maxH={"272px"}
                objectFit={"cover"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              />
            </Flex>

            <Input
              mt={5}
              id="caption"
              placeholder="caption"
              onChange={inputHandler}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              variant="ghost"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  uploudPost();
                  setPost({ caption: "" });
                  setImage(icon);
                }, 2000);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
