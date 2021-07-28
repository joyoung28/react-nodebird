const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Commnet extends Model {
  static init(sequelize) {
    return super.init(
      {
        //id는 기본적으로 들어있음
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        // UserId: 1
        // PostId: 3
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글 저장, mb4-이모티콘
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};
