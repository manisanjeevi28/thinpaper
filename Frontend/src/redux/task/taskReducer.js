const taskReducer = (state, action) => {
  switch(action.type){
    case "LISTSUCCACTION":
      return { 
        ...state,
        tasks: action.payload
      };
      break;
    case "ADDSUCCACTION":
      return { 
        ...state,
        add: true,
        updated: new Date()
      };
      break;
    case "DELETESUCCACTION":
        return { 
          ...state,
          msg: action.payload,
          updated: new Date()
        };
        break;
    default:
      return {...state};
  }
}
export default taskReducer;