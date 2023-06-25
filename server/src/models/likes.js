module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define(
    "Likes",
    {
      status: {
        type: Sequelize.ENUM("LIKE", "UNLIKE"),
      },
    }
    //user_id
    //post_id
  );
  return Likes;
};
