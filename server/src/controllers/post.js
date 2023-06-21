const db = require("../models");
const moment = require("moment");
const post_url = process.env.post_url;

const postController = {
  newPost: async (req, res) => {
    try {
      const { caption } = req.body;
      const { filename } = req.file;

      const post = await db.Post.create({
        caption,
        date: moment().format("LLLL"),
        image: post_url + filename,
        user_id: req.params.id,
      });

      return res.send({ data: post, message: "success uploud new post" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAllPost: async (req, res) => {
    await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "fullname", "avatar_url"],
        },
      ],
    }).then((result) => res.send(result));
  },
  getAllPostbyUser: async (req, res) => {
    try {
      await db.Post.findAll({
        where: {
          user_id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getPostById: async (req, res) => {
    await db.Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));
  },
  deletePost: async (req, res) => {
    await db.Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.send({ message: "success deleted" });
  },
  editPost: async (req, res) => {
    const { caption } = req.body;
    await db.Post.update(
      {
        caption,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.send({ message: "success edited" });
  },
  likePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await db.Post.findByPk(id);
      if (!post) {
        throw new Error("post not found");
      }
      post.likes++;
      await post.save();
      return res.send({ message: "post liked successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  unlikePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await db.Post.findByPk(id);
      if (!post) {
        throw new Error("post not found");
      }

      if (post.likes > 0) {
        post.likes--;
        await post.save();
      }
      return res.send({ message: "post unliked successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
};

module.exports = postController;
