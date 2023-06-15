const init = {
  username: "",
  password: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      fullname: action.payload.fullname,
      username: action.payload.username,
      avatar_url: action.payload.avatar_url,
      bio: action.payload.bio,
      status: action.payload.status,
    };
  } else if (action.type == "logout") {
    return init;
  }
  return state;
}

export default userReducer;
