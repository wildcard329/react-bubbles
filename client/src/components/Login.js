import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = () => {
  const {push} = useHistory();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  const login = e => {
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log("credentials",res)
        localStorage.setItem('token', res.data.payload);
        push('/protected');
      })
      .catch(err => console.error("Error Logging In",err,err.response));
  };
  return (
    <div>
      <form onSubmit={login}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </form>
      <button type="submit" onClick={login}>Log In</button>
    </div>
  );
};

export default Login;
