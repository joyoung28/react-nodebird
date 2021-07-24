const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");

db.sequelize
  .sync()
  .then(() => {
    console.log("연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "*",
  })
);

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello express");
});

app.listen(3065, () => {
  console.log("서버실행 중");
});
