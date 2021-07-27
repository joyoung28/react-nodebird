const passport = require("passport");
const { User } = require("../models");
const user = require("../models/user");
const local = require("./local");

module.exports = () => {
  //쿠키랑 묶어줄 id만 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //db에서 가져오기
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
