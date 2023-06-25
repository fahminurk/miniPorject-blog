const express = require("express");
const router = express.Router();
const commentController = require("../controllers").commentController;

router.post("/:post_id", commentController.newComment);

router.get("/:id", commentController.getAllCommentByPostId);

module.exports = router;
