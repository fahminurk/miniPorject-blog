const db = require("../models");

const LikeController = {
  getAllLikeByUserId: async (req, res) => {
    try {
      const { user_id } = req.params;
      await db.Likes.findAll({
        where: {
          user_id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  likePost: async (req, res) => {
    try {
      const { user_id } = req.body;
      const { post_id } = req.params;

      const post = await db.Post.findByPk(post_id);
      if (!post) {
        throw new Error("post not found");
      }

      const existingLike = await db.Likes.findOne({
        where: {
          post_id,
          user_id,
        },
      });
      if (existingLike) {
        throw new Error("Like alrdy exist");
      }

      const newLike = await db.Likes.create({
        post_id,
        user_id,
        status: "LIKE",
      });

      await post.increment("likes", { by: 1 });

      return res.send(newLike);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  unlikePost: async (req, res) => {
    try {
      const { post_id } = req.params;
      const { user_id } = req.body;

      const post = await db.Post.findByPk(post_id);
      if (!post) {
        throw new Error("post not found");
      }

      const like = await db.Likes.findOne({ where: { user_id, post_id } });
      if (!like) {
        return res.send({ message: "Like not found" });
      }

      await like.destroy();

      // Update jumlah suka di postingan
      await post.decrement("likes", { by: 1 });

      return res.send({ message: "Successfully unliked the post" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
};

module.exports = LikeController;
