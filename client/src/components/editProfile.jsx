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
  Textarea,
  Box,
  Avatar,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

export default function EditProfile(props) {
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(userSelector.avatar_url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({
    ...userSelector,
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    console.log(tempUser);
    setUser(tempUser);
  };

  const editProfile = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("fullname", user.fullname);
    formData.append("username", user.username);
    formData.append("bio", user.bio);

    const response = await api
      .patch("/accounts/editProfile/" + userSelector.id, formData)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
        // dispatch({
        //   type: "login",
        //   payload: response.data,
        // });
        props.onClose();
      })
      .catch(() => {
        toast({
          title: "username alredy exist",
          status: "error",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      });
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
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
              <Avatar
                src={image}
                size={"xl"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              />
            </Flex>
            username
            <Input
              id="username"
              placeholder="username"
              defaultValue={userSelector.username}
              onChange={inputHandler}
            />
            fullname
            <Input
              id="fullname"
              placeholder="fullname"
              defaultValue={userSelector.fullname}
              onChange={inputHandler}
            />
            Bio
            <Textarea
              id="bio"
              placeholder="Bio"
              defaultValue={userSelector.bio}
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
                  editProfile();
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
