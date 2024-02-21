import { REACT_BACKEND_URL } from "../../config/config";
import axios from 'axios';

export const getTaskListAction = (data) => dispatch => {
  axios.get(REACT_BACKEND_URL+'/tasks/list', {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'LISTSUCCACTION',
          payload: res?.data?.data
        });
      }
    })
}


export const AddTaskAction = (data) => dispatch => {
  axios.post(REACT_BACKEND_URL+'/tasks/add', data, {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'ADDSUCCACTION',
          payload: res?.data?.data
        });
      }
    })
}

export const deleteTaskAction = (id) => dispatch => {
  axios.delete(REACT_BACKEND_URL+`/tasks/${id}`, {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'DELETESUCCACTION',
          msg: res?.data?.message
        });
      }
    })
}

export const editTaskAction = (data) => dispatch => {
  axios.put(REACT_BACKEND_URL+'/tasks/delete/', {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'ADDSUCCACTION',
          payload: res?.data?.data
        });
      }
    })
}