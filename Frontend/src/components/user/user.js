import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/user/userAction';

const User = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    props.logoutAction();
    navigate('/login');
  }

  return (
    <>
    <h1>Home Page</h1>
    <button  className="btn btn-primary" onClick={(e) => logout()} >Logout</button>
    </>
  );
}

const mapStateToProps = state => {
  return { }
}
const mapDispatchToProps = {
  logoutAction
}
export default connect(mapStateToProps, mapDispatchToProps)(User);