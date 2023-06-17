import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DeletePost(props) {
  console.log(props);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const deletePost = async () => {
    await api.delete("/posts/" + props.id).then((res) => {
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
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure want delete this post (id: {props.id})?
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
                  deletePost();
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
