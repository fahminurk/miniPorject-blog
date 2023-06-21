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
      location: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      //user_id
    },
    {
      paranoid: true,
    }
  );
  return Post;
};
