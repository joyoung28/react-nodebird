export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "yougeun",
      },
      content: "첫 번째 게시글 #익스프레스",
      Images: [
        {
          src: "https://blog.kakaocdn.net/dn/IH7pg/btqGH1ZgBXx/t8KhtXCPoKDM1ZKljOv270/img.jpg",
        },
        {
          src: "http://www.tiptipnews.co.kr/news/photo/201708/9173_11382_5118.jpg",
        },
        {
          src: "http://image.yes24.com/goods/73031896/XL",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "야호",
          },
          content: "무야호!",
        },
        {
          User: {
            nickname: "jojo",
          },
          content: "멋있어요!",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다",
  User: {
    id: 1,
    nickname: "joyoung",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
