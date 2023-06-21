module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    "Comments",
    {
      content: Sequelize.STRING,
    },
    //user_id
    //post_id
    {
      paranoid: true,
    }
  );
  return Comment;
};
