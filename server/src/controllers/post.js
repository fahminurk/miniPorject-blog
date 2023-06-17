const db = require("../models");
const moment = require("moment");
const post_url = process.env.post_url;

const postController = {
  newPost: async (req, res) => {
    try {
      // console.log("asdasdf");
      const { caption } = req.body;
      const { filename } = req.file;

      await db.Post.create({
        caption,
        date: moment().format("MMMM Do YYYY, h:mm:ss"),
        image: post_url + filename,
        user_id: req.params.id,
      });
      return res.send({ message: "success uploud new post" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAllPost: async (req, res) => {
    await db.Post.findAll({
      include: [
        { model: db.User, attributes: ["username", "fullname", "avatar_url"] },
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
};

module.exports = postController;
