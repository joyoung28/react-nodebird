const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const helmet = require("helmet");
const hpp = require("hpp");
const db = require("./models");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");
const passportConfig = require("./passport");

dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: ["http://localhost:3000", "nodebird.com", "http://3.34.252.247"],
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "uploads")));
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
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.get("/", (req, res) => {
  res.send("Hello express");
});

//에러처리 미들웨어,
//기본적으로 내장되어 있으나 에러처리를 바꾸려면 만들어준다.
// app.use((err, req, res, next) => {});

app.listen(80, () => {
  console.log("서버실행 중");
});
