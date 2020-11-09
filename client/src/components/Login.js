import React,{useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  let history = useHistory();
  const [loginToken, setLoginToken] = useState({
    username : "",
    password : ""
  });

  const handleChange = e => {
    console.log("checking our handleChange target.value :", e.target.value);
    setLoginToken({...loginToken, [e.target.name] : e.target.value});
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/login", loginToken)
    .then(res => {
      console.log("login post request for token from api :", res );
      localStorage.setItem("token", res.data.payload);
      history.push("/bubble-page");

    })
    .catch(err => {
      console.log("post request to retrieve token from api failed! We'll get it next time : ", err);
    });
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit = {onSubmit}>
        <label htmlFor = "username">Username : </label>
        <input 
        type = "text"
        name = "username"
        value = {loginToken.username}
        onChange = {handleChange}
        />

        <label htmlFor = "password">Password : </label>
        <input 
        type = "text"
        name = "password"
        value = {loginToken.password}
        onChange = {handleChange}
        />
        <button type = "submit"> Log in! </button>
      </form>
    </>
  );
};

export default Login;
