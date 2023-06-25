const db = require("../models");

const commentController = {
  newComment: async (req, res) => {
    try {
      const { user_id, content } = req.body;
      const { post_id } = req.params;

      const newC = await db.Comment.create({
        content,
        user_id,
        post_id,
      });
      return res.send({ data: newC, message: "successful comment" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getAllCommentByPostId: async (req, res) => {
    try {
      await db.Comment.findAll({
        include: [
          {
            model: db.User,
            attributes: ["username", "fullname", "avatar_url"],
          },
        ],
        where: {
          post_id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
};

module.exports = commentController;
