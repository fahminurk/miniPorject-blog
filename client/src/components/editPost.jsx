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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function EditPost(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [post, setPost] = useState({
    caption: props.caption,
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...post };
    tempUser[id] = value;
    // console.log(tempUser);
    setPost(tempUser);
  };

  const editPost = async () => {
    await api.patch("/posts/" + props.id, post).then((res) => {
      console.log(res.data);
      toast({
        title: res.data.message,
        status: "success",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
      props.fetch();
      props.onClose();
    });
  };

  return (
    <>
      <Modal size={"xs"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            caption
            <Input
              id="caption"
              defaultValue={props.caption}
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
                  editPost();
                  nav("/profile");
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
