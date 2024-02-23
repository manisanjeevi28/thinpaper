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
          info: null,
          info: action.payload,
          updated: new Date()
        };
        break;
    case "DELETESUCCACTION":
        return { 
          ...state,
          errorFlag: false,
          info: null,
          msg: action.payload?.message,
          updated: new Date()
        };
        break;
    case "ERROR":
      return { 
        ...state,
        errorFlag: true,
        info: null,
        msg: action.payload?.message,
      };
      break;
    case 'MARKCOMPLETE':
      return { 
        ...state,
        errorFlag: false,
        info: null,
        msg: action.payload?.message,
        updated: new Date()
      };
      break;
    case 'MARKREOPEN':
      return { 
        ...state,
        errorFlag: false,
        info: null,
        msg: action.payload?.message,
        updated: new Date()
      };
      break;
    default:
      return {...state};
  }
}
export default taskReducer;