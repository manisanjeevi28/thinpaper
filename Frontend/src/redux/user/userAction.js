import axios from 'axios';
import { REACT_BACKEND_URL } from "../../config/config";

export const loginAction = (data) => dispatch => {
  axios.post(REACT_BACKEND_URL+'/users/login', data).then(res => {
    if(res?.data?.status===true) {
      sessionStorage.setItem('uid', res?.data?.data?.id)
      dispatch({
        type: 'LOGINSUCCACTION',
        payload: res?.data?.data
      });
    } else {
      dispatch({
        type: 'LOGINFAIL',
        payload: res?.data
      });
    }
  })
}

export const logoutAction = (data) => dispatch =>{
  dispatch({
    type: 'LOGOUTSUCCESS',
    payload: false
  });
}
