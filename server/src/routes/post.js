const express = require("express");
const router = express.Router();
const postController = require("../controllers").postController;
const { fileUploader } = require("../middlewares/multer");

router.post(
  "/new/:id",
  fileUploader({
    destinationFolder: "post",
  }).single("post"),
  postController.newPost
);
//get all post by id
router.get("/:id", postController.getAllPostbyUser);

//get post by id
router.get("/post/:id", postController.getPostById);

// get all post
router.get("/", postController.getAllPost);

//delete post
router.delete("/:id", postController.deletePost);

//edit post
router.patch("/:id", postController.editPost);

module.exports = router;
