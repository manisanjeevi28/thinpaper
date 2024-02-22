const taskReducer = (state, action) => {
  switch(action.type){
    case "LISTSUCCACTION":
      return { 
        ...state,
        tasks: action.payload,
        info: null,
        errorFlag: false,
      };
      break;
    case "ADDSUCCACTION":
      return { 
        ...state,
        msg: action.payload?.message,
        info: null,
        errorFlag: false,
        updated: new Date()
      };
      break;
    case "EDITSUCCACTION":
        return { 
          ...state,
          msg: action.payload?.message,
          info: null,
          errorFlag: false,
          updated: new Date()
        };
        break;
    case "GETSUCCACTION":
        return { 
          ...state,
          errorFlag: false,
          info: action.payload,
          updated: new Date()
        };
        break;
    case "DELETESUCCACTION":
        return { 
          ...state,
          errorFlag: false,
          msg: action.payload?.message,
          updated: new Date()
        };
        break;
    case "ERROR":
          return { 
            ...state,
            errorFlag: true,
            msg: action.payload?.message,
          };
          break;
    default:
      return {...state};
  }
}
export default taskReducer;