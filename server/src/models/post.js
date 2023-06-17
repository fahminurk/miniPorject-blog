module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Posts",
    {
      date: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.STRING,
      },
      //user_id
    },
    {
      paranoid: true,
    }
  );
  return Post;
};
