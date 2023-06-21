const express = require("express");
const router = express.Router();
const likeController = require("../controllers").likeController;

router.post("/:post_id", likeController.likePost);
router.delete("/:post_id", likeController.unlikePost);

module.exports = router;
