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
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
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
          payload: res?.data
        });
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
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
          payload: res?.data
        });
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
        });
      }
    })
}

export const getTaskAction = (id) => dispatch => {
  axios.post(REACT_BACKEND_URL+`/tasks/${id}`, null, {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'GETSUCCACTION',
          payload: res?.data?.data
        });
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
        });
      }
    })
}

export const editTaskAction = (data) => dispatch => {
  axios.put(REACT_BACKEND_URL+`/tasks/${data.id}`, data, {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        dispatch({
          type: 'EDITSUCCACTION',
          payload: res?.data
        });
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
        });
      }
    })
}