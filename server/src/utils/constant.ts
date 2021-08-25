const constant = {
  MILLISECONDS_OF_SEVEN_DAYS: 60 * 60 * 24 * 1000 * 7,
  EXPIRE_MESSAGE: '유효하지 않은 토큰입니다.',
  WRONG_INFO: '아이디 혹은 비밀번호가 틀렸습니다.',
  LOGIN_SUCCESS: '로그인이 완료되었습니다.',
  LOGOUT_SUCCESS: '로그아웃 완료되었습니다.',
  SIGN_UP_SUCCESS: '회원가입 완료되었습니다.',
  USER_NOT_EXIST: '존재하지 않는 유저 입니다.',
  USER_EXIST_ALREADY: '이미 가입된 사용자입니다.',
  USER_INFO_INVALID: '유저 정보가 조건을 만족하지 않습니다.',
  LOGIN_REQUIRED: '로그인이 필요합니다',
  NOT_VALID_TOKEN: '유효하지 않은 토큰입니다. 조작 ㄴㄴ',
  GO_SIGNUP_PAGE: '회원가입 페이지로 이동하세요',
  GET_REVIEW_SUCCEESS: '리뷰 목록을 불러왔습니다.',
  CREATE_REVIEW_SUCCESS: '리뷰가 등록되었습니다',
  DELETE_REVIEW_SUCCESS: '리뷰 삭제가 완료되었습니다.',
  UPDATE_REVIEW_SUCCESS: '리뷰 수정이 완료되었습니다.',
  GET_REVIEW_SUCCESS: '유저의 리뷰를 불러왔습니다.',
  REVIEW_DUPLICATE: '이미 리뷰를 작성하셨습니다',
  REVIEW_NOT_EXIST: '작성하신 리뷰가 존재하지 않습니다.',
  GET_LIKE_SUCCESS: '좋아요 목록을 불러왔습니다.',

  GET_TOKEN_URL: `https://github.com/login/oauth/access_token`,
  GET_USER_INFO_URL: `https://api.github.com/user`,
  AUTH_TOKEN_NAME: 'AUTH_TOKEN',
  ACCESS_TOKEN_NAME: 'ACCESS_TOKEN',
  STATUS_NO_CONTENT: 204, // PUT, DELETE 처럼 reponse에 특별한 데이터를 보낼 필요 없을때
  STATUS_AUTH_FAILURE: 401,
  STATUS_NO_AUTHORIZED: 403,
  STATUS_CONFLICT: 409,
  STATUS_INVALID_DATA: 422,
  STATUS_SERVER_ERROR: 500,
};

export default constant;
