module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        type: Sequelize.STRING,
        // unique: "email",
      },
      username: {
        type: Sequelize.STRING,
        // unique: "username",
      },
      password: {
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("verified", "unverified"),
        defaultValue: "unverified",
      },
    },
    {
      indexes: [
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["username"] },
      ],
    },
    {
      paranoid: true,
    }
  );
  return User;
};
