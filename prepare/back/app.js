const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const db = require("./models");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const passportConfig = require("./passport");

dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello express");
});

//에러처리 미들웨어,
//기본적으로 내장되어 있으나 에러처리를 바꾸려면 만들어준다.
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log("서버실행 중");
});
