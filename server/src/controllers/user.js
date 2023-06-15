const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/nodemailer");
const url = process.env.forgot_password_url;

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      const checkEmail = await db.User.findOne({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        throw new Error("email alredy exist");
      }

      const checkUsername = await db.User.findOne({
        where: {
          username,
        },
      });
      if (checkUsername) {
        throw new Error("username alredy exist");
      }

      await db.User.create({
        username,
        email,
        password: hashPassword,
      });
      return res.send({ message: "success create account" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { usernameOrEmail, password } = req.body;

      const user = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            {
              email: usernameOrEmail,
            },
            {
              username: usernameOrEmail,
            },
          ],
        },
      });
      // console.log(user);
      if (!user) {
        throw new Error("username or email not found");
      } else {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (!match) {
          throw new Error("wrong password");
        } else {
          const payload = { id: user.dataValues.id };

          const token = await db.Token.create({
            expired: moment().add(1, "h").format(),
            token: nanoid(),
            payload: JSON.stringify(payload),
            status: "LOGIN",
          });
          return res.status(200).send({
            message: "success login",
            token: token.dataValues.token,
            data: user.dataValues,
          });
        }
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getByToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];

      let checkToken = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });

      if (!checkToken) {
        throw new Error("token has expired");
      }

      let user = await db.User.findOne({
        where: {
          id: JSON.parse(checkToken.dataValues.payload).id,
        },
      });
      req.user = user;
      next();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  getUserByToken: async (req, res) => {
    delete req.user.dataValues.password;
    // console.log(req.user);
    res.send(req.user);
    // res.send({
    //   data: req.user,
    //   message: "success login",
    // });
  },
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(user);

      if (user) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );

        const token = await db.Token.create({
          expired: moment().add(10, "minutes").format(),
          token: nanoid(),
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: mailer.subject,
          to: user.dataValues.email,
          text: url + token.dataValues.token,
        });
        return res.send({ message: "check your email" });
      } else {
        throw new Error("Email not found");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      let token = req.headers.authorization;
      // const { password } = req.body.user;
      const { password } = req.body;
      const { id } = req.user;

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      return res.send({ message: "success change passowrd" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
};
module.exports = userController;
