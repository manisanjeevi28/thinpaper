import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/user/userAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTaskListAction, AddTaskAction, getTaskAction, editTaskAction, deleteTaskAction } from '../../redux/task/taskAction';

const TaskDashboard = (props) => {
  const {info} = props;
  const taskInput = useRef(null);
  const datepickerRef = useRef(null);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskItem, setTaskItem] = useState('');
  const [list, setList] = useState([]);

  const [editItem, setEditItem] = useState(0);

  useEffect(() => {
    setList((props.tasks ? props.tasks : []));
  }, [props.tasks])

  // Any update happend in the item
  useEffect(() => {
    if(info) {
      taskInput.current.focus();
      setTaskItem(info?.message);
      setStartDate(fomateDate(info?.due));
      setEditItem(info?.id);
    } else {
      props.getTaskListAction();
    }
  }, [props?.updated, info])

  // Default component render
  useEffect(() => {
    //setStartDate(fomateDate());
    props.getTaskListAction();
  }, [])

  const logout = () => {
    props.logoutAction();
    navigate('/login');
  }

  const handleSubmitTask= (e) => {
    e.preventDefault();
    if(editItem) {
      props.editTaskAction({"id": editItem, "message": taskItem, "date": startDate});
    } else {
      props.AddTaskAction({"message": taskItem, "date": startDate});
    }
    handleReset();
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure want to delete this task?")) {
      props.deleteTaskAction(id);
    }
  }

  const handleEdit = (id) => {
    props.getTaskAction(id);
  }

  const handleReset = () => {
    setTaskItem('');
    setStartDate(fomateDate());
    setEditItem(0);
  }


  const fomateDate = (date) => {
    const dateObj =  date ? new Date(date) : new Date();
    var d = dateObj.getDate();
    var m = dateObj.getMonth() + 1; //Month from 0 to 11
    var y = dateObj.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y;
  }

  return (
    <>
    {/*<h1>Task Dashboard</h1>
    <button  className="btn btn-primary" onClick={(e) => logout()} >Logout</button>
    */}
    <section className="vh-100 width100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card" >
              <div className="card-body py-4 px-4 px-md-5">

                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i className="fa fa-check-square me-1"></i>
                  <u>My Task Manager</u>
                  
                </p>
                <p style={{"text-align": "right", "cursor": "pointer"}}><span onClick={(e) => logout()}>Logout</span></p>

                <div className="pb-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-row align-items-center">
                        <form className='form-group width100' method='post' onSubmit={handleSubmitTask}>
                          <input type="text" ref={taskInput} required className="form-control form-control-lg" placeholder="Add new task..." onChange={(e) => setTaskItem(e.target.value)} value={taskItem} />
                          <div className='mt-3 row'>
                            <span className='col-md-3'>
                            <DatePicker ref={datepickerRef} 
                              className="form-control form-control-sm mr-3" 
                              dateFormat="dd-MM-yyyy"
                              selected={startDate} 
                              onChange={(date) =>setStartDate(fomateDate(date))} />
                            </span>
                            <button type="submit" className="btn btn-primary mx-3 col-md-2">{editItem ? "Update Task" : "Add Task"}</button>
                            {editItem ? <button type='reset' className="btn btn-primary mx-3 col-md-2" onClick={() => handleReset() }>Reset</button> : ''}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                  {props?.msg ? <div className='alert alert-success'>{props?.msg}</div> : ''}
                  {props?.msg && props?.errorFlag ? <div className='alert alert-danger'>{props?.msg}</div> : ''}
                  
                  {list && list.map((item) => {
                    return(<ul className="list-group list-group-horizontal rounded-0" id={item.id}>
                    <li
                      className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                      <div className="form-check">
                        <input className="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked2"
                          aria-label="..." />
                      </div>
                    </li>
                    <li
                      className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                      <p className="lead fw-normal mb-0">{item.message}</p>
                    </li>
                    {/*<li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                      <div
                        className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                        <p className="small mb-0">
                          <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                            <i className="fas fa-hourglass-half me-2 text-warning"></i>
                          </a>
                          {item.due}
                        </p>
                      </div>
                    </li>*/}
                    <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                      <div className="d-flex flex-row justify-content-end mb-1">
                        <span className="text-info" data-mdb-toggle="tooltip" title="Edit todo" onClick={() => handleEdit(item.id)}><i className="fa fa-pencil me-3"></i></span>
                        <span className="text-danger" data-mdb-toggle="tooltip" title="Delete todo" onClick={() => handleDelete(item.id)}><i className="fa fa-trash"></i></span>
                      </div>
                      <div className="text-end text-muted">
                        <span className="text-muted" data-mdb-toggle="tooltip" title="Created date">
                          <p className="small mb-0"><i className="fa fa-info-circle me-2"></i>{item.due}</p>
                        </span>
                      </div>
                    </li>
                  </ul>);
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

const mapStateToProps = state => {
  return { 
    tasks: state?.taskReducer?.tasks,
    updated: state?.taskReducer?.updated,
    msg: state?.taskReducer?.msg,
    info: state?.taskReducer?.info,
    errorFlag: state?.taskReducer?.errorFlag,
  }
}
const mapDispatchToProps = {
  logoutAction,
  getTaskListAction,
  AddTaskAction,
  getTaskAction,
  deleteTaskAction,
  editTaskAction
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDashboard);