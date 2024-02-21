const userReducer = (state, action) => {
  switch(action.type){
    case "LOGINSUCCACTION":
      return { 
        ...state,
        user: action.payload,
        updated: new Date(),
        loginStatus: true
      };
      break;
    case 'LOGINFAIL':
      return { 
        ...state,
        loginStatus: action?.payload?.status,
        updated: new Date()
      };
    case 'LOGOUTSUCCESS':
      sessionStorage.removeItem('uid');
      return { 
        ...state,
        loginStatus: null,
        user: action?.payload,
        updated: new Date()
      };
    break;
    default:
      return {...state};
  }
}
export default userReducer;