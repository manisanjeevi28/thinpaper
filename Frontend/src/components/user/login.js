import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginAction} from '../../redux/user/userAction';
import { isUserLoggedIn } from '../../utils/common';

const Login = (props) => {
  const {updated, loginStatus} = props;

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(isUserLoggedIn()) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    if(loginStatus) {
      navigate('/');
    }
  }, [updated, loginStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginAction({"email": email, "password": pass});
  }

  return (
    <>
    {loginStatus === false ? <div className='alert alert-danger'>Your credential not matching with the records in the system.</div> : ''}
    <form method='post' className="form-group custom-form" onSubmit={handleSubmit}>
      <label>Email</label>
      <input type="email" required className="form-control" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password</label>
      <input type="password" required className="form-control" onChange={(e) => setPass(e.target.value)} />
      <br />
      <button type="submit" className="btn btn-success btn-md">Login</button>
    </form>
    </>
  );
}

const mapStateToProps = state => {
  return { 
    loginStatus: state?.userReducer?.loginStatus,
    updated: state?.userReducer?.updated
  }
}
const mapDispatchToProps = {
  loginAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);