import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import NavbarHome from "../components/navbarHome";
import { CiMenuKebab } from "react-icons/ci";
import { BsChat } from "react-icons/bs";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import PopupVerif from "../components/popupVerif";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import moment from "moment/moment";
import Footer from "../components/Footer";

export default function HomePage() {
  const userSelector = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  // console.log(posts);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get("/posts");
      const sortedPosts = response.data.sort((a, b) =>
        moment(b.date).diff(a.date)
      );
      const updatedPosts = sortedPosts.map((post) => ({
        ...post,
        liked: getLikedStatus(post.id),
        comments: [],
      }));
      setPosts(updatedPosts);

      // Fetch comments for each post
      updatedPosts.forEach((post) => {
        fetchComments(post.id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (post_id) => {
    try {
      const response = await api.get(`/comments/${post_id}`);
      const comments = response.data;
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === post_id) {
            return { ...post, comments: comments };
          }
          return post;
        });
        return updatedPosts;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const saveLikedStatus = (post_id, liked) => {
    const likedStatus = JSON.parse(localStorage.getItem("likedStatus")) || {};
    likedStatus[post_id] = liked;
    localStorage.setItem("likedStatus", JSON.stringify(likedStatus));
  };

  const getLikedStatus = (post_id) => {
    const likedStatus = JSON.parse(localStorage.getItem("likedStatus")) || {};
    return likedStatus[post_id] || false;
  };

  const handleLikeUnlike = async (post_id) => {
    const liked = getLikedStatus(post_id);

    try {
      if (liked) {
        await api.delete(`/likes/${post_id}`, {
          data: { user_id: userSelector.id },
        });
      } else {
        await api.post(`/likes/${post_id}`, { user_id: userSelector.id });
      }

      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === post_id) {
            return { ...post, liked: !liked };
          }
          return post;
        });
        return updatedPosts;
      });

      saveLikedStatus(post_id, !liked); // Menyimpan status liked ke localStorage
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async (post_id) => {
    try {
      if (!newComment) {
        console.log("isi komen anda");
      } else {
        const response = await api.post(`/comments/${post_id}`, {
          user_id: userSelector.id,
          content: newComment,
        });
        console.log(response.data);
        const comment = response.data;

        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.map((post) => {
            if (post.id === post_id) {
              return { ...post, comments: [...post.comments, comment] };
            }
            return post;
          });
          return updatedPosts;
        });

        setNewComment("");
        fetchComments(post_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavbarHome />
      {userSelector.status == "unverified" ? <PopupVerif /> : null}
      {posts.length === 0 ? (
        <Box>
          <Center h={"100vh"}>
            <Text>no post avaible</Text>
          </Center>
        </Box>
      ) : (
        <Box>
          <Center>
            <Flex
              flexDir={"column"}
              w={"100vw"}
              maxW={"470px"}
              p={2}
              pt={"80px"}
              pb={"35px"}
              border={"1px"}
              h={!posts ? "100vh" : null}
            >
              {posts?.map((post) => {
                return (
                  <>
                    <Box key={post.id} mb={5}>
                      <Flex
                        justifyContent={"space-between"}
                        align={"center"}
                        p={1}
                        border={"1px"}
                      >
                        <Flex gap={3} w={"90%"}>
                          <Box>
                            <Avatar src={post.user.avatar_url} />
                          </Box>
                          <Box flexDir={"column"}>
                            <Flex gap={1}>
                              <Text>{post.user.username}</Text>-
                              <Text>
                                {moment(post.date).startOf("minute").fromNow()}
                              </Text>
                            </Flex>

                            <Text>location</Text>
                          </Box>
                        </Flex>
                        <Box boxSize={8}>
                          <Image as={CiMenuKebab} size={"lg"} />
                        </Box>
                      </Flex>

                      <Box w={"100%"} maxH={"470px"} borderInline={"1px"}>
                        <Image
                          objectFit={"contain"}
                          src={post.image}
                          h={"100vh"}
                          maxH={"470px"}
                          w={"100vw"}
                          // maxW={"470px"}
                        />
                      </Box>

                      <Flex
                        h={"40px"}
                        w={"100%"}
                        border={"1px"}
                        gap={2}
                        align={"center"}
                        p={2}
                        justifyContent={"space-between"}
                      >
                        <Flex align={"center"} gap={5}>
                          <Box boxSize={7}>
                            <Image
                              as={
                                getLikedStatus(post.id)
                                  ? AiFillHeart
                                  : AiOutlineHeart
                              }
                              size={"lg"}
                              onClick={() => handleLikeUnlike(post.id)}
                            />
                          </Box>
                          <Box boxSize={6}>
                            <Image as={BsChat} size={"lg"} />
                          </Box>
                          <Box boxSize={6}>
                            <Image as={IoPaperPlaneOutline} size={"lg"} />
                          </Box>
                        </Flex>

                        <Box boxSize={6}>
                          <Image as={BsBookmark} size={"lg"} />
                        </Box>
                      </Flex>

                      <Flex border={"1px"} px={2} gap={2}>
                        <Text>
                          {post.likes} {post.likes < 2 ? "Like" : "Likes"}
                        </Text>
                      </Flex>

                      <Flex borderX={"1px"} px={2} gap={2}>
                        <Text fontWeight={"bold"}>{post.user.username}</Text>
                        <Text>{post.caption}</Text>
                      </Flex>

                      <Box border={"1px"} px={2} gap={2}>
                        <Text textColor={"gray"} fontSize={"13px"}>
                          {post.comments.length > 1
                            ? `View all ${post.comments.length} comments`
                            : null}
                        </Text>
                      </Box>

                      {post?.comments.map((comment) => (
                        <Flex
                          borderInline={"1px"}
                          px={2}
                          gap={2}
                          key={comment.id}
                        >
                          <Text fontWeight={"bold"}>
                            {comment?.user?.username}
                          </Text>
                          <Text>{comment.content}</Text>
                        </Flex>
                      ))}

                      <Box>
                        <InputGroup size={"sm"}>
                          <Input
                            placeholder="Add a comment..."
                            borderRadius={0}
                            value={newComment}
                            onChange={handleCommentInputChange}
                          />
                          <InputRightAddon>
                            <Button
                              size={"xs"}
                              onClick={() => handleAddComment(post.id)}
                            >
                              Add
                            </Button>
                          </InputRightAddon>
                        </InputGroup>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </Flex>
          </Center>
        </Box>
      )}
      <Footer fetchPost={fetchPost} />
    </>
  );
}
