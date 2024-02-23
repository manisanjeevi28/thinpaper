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
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
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
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
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
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
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
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
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
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
}


export const changeTaskStatusAction = (data) => dispatch => {
  axios.put(REACT_BACKEND_URL+`/tasks/status/${data.id}`, data, {
    headers: {
      'authorization': sessionStorage.getItem('uid')
    },
  }).then(res => {
      if(res?.data?.status===true){
        if(data.status == 1) {
          dispatch({
            type: 'MARKCOMPLETE',
            payload: res?.data
          });
        } else {
          dispatch({
            type: 'MARKREOPEN',
            payload: res?.data
          });
        }
      } else {
        dispatch({
          type: 'ERROR',
          payload: res?.data
        });
      }
    }).catch(function(error) {
      console.log(error)
      dispatch({
        type: 'NETWORKERROR',
      });
    });
}