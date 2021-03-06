const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        //id는 기본적으로 들어있음
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글 저장, mb4-이모티콘
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User); //post.addUser, post.getUser, post.setUser(수정)
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); //post.addHashtags, post.removeHachtags
    db.Post.hasMany(db.Comment); //post.addComments, post.getCommnets
    db.Post.hasMany(db.Image); //post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); //post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: "Retweet" }); //post.addRetweet
  }
};
