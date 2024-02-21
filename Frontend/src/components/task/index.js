import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/user/userAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTaskListAction, AddTaskAction, editTaskAction, deleteTaskAction } from '../../redux/task/taskAction';
import taskReducer from '../../redux/task/taskReducer';

const TaskDashboard = (props) => {
  
  const datepickerRef = useRef(null);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskItem, setTaskItem] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log(props.tasks)
    setList((props.tasks ? props.tasks : []));
  }, [props.tasks])

  useEffect(() => {
    props.getTaskListAction();
  }, [props?.updated])

  useEffect(() => {
    props.getTaskListAction();
  }, [])

  const logout = () => {
    props.logoutAction();
    navigate('/login');
  }

  const handleAddTask= () => {
    props.AddTaskAction({"message": taskItem, "date": startDate});
    setTaskItem('');
    setStartDate(new Date().toISOString().split('T')[0]);
  }

  const handleDelete = (id) => {
    props.deleteTaskAction(id);
  }

  return (
    <>
    {/*<h1>Task Dashboard</h1>
    <button  className="btn btn-primary" onClick={(e) => logout()} >Logout</button>
    */}
    <section className="vh-100">
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
                        <input type="text" required className="form-control form-control-lg" placeholder="Add new..." onChange={(e) => setTaskItem(e.target.value)} value={taskItem} />
                          <DatePicker ref={datepickerRef} 
                          dateFormat="dd-MM-yyyy"
                          selected={startDate} 
                          onChange={(date) => setStartDate(`${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`)} />
                          {/* <a href="#!" data-mdb-toggle="tooltip" title="Set due date">
                            <i className="fa fa-calendar fa-lg me-3" onClick={() => datepickerRef.current.setFocus(true)}></i>
                          </a> */ }
                        <div>
                          <button type="button" className="btn btn-primary" onClick={handleAddTask}>Add</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                  {props?.msg ? <div className='alert alert-danger'>{props?.msg}</div> : ''}
                  
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
                        <span className="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i className="fa fa-pencil me-3"></i></span>
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
    msg: state?.taskReducer?.msg
  }
}
const mapDispatchToProps = {
  logoutAction,
  getTaskListAction,
  AddTaskAction,
  editTaskAction,
  deleteTaskAction
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskDashboard);