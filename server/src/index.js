const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");
const PORT = process.env.PORT;

// db.sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("test"));
app.use("/accounts", routes.userRoutes);
app.use("/posts", routes.postRoutes);
app.use("/likes", routes.likeRoutes);
app.use("/comments", routes.commentRoutes);
app.use("/avatar", express.static(`${__dirname}/public/avatar`));
app.use("/post", express.static(`${__dirname}/public/post`));

const server = app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
