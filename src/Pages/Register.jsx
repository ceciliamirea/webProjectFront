
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBDropdown, 
    MDBDropdownMenu, 
    MDBDropdownToggle, 
    MDBDropdownItem
  }
  from 'mdb-react-ui-kit';
  import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

  function Register() {
    const navigate = useNavigate();
    const [userName, setuserName] = useState("");
    const [userMail, setuserMail] = useState("");
    const [userRole, setuserRole] = useState("");
    const [userPassword,setuserPassword] = useState("");
    
    async function registerApi() {
     console.log(userRole)
     await axios.post(`http://localhost:3000/api/user`,{
      userName: userName,
      userMail:userMail,
      userPassword: userPassword,
      userRole:userRole
     })
        .then(res => {
          navigate('/main',{state:res.data});
          console.log(res)
        })
        .catch(err =>{
          console.log(err)
        })
    }
    useEffect(() => {
       console.log(userRole)
      }, [userRole]);

      const handleSelect = e => setuserRole(e.target.text)
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50" >
        <p>Enter your name:</p>
        <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='name'onChange={e=>{
        setuserName(e.target.value);
      }}/>
        <p>Enter your email:</p>
        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='name' onChange={e=>{
        setuserMail(e.target.value);
      }}/>
        <MDBDropdown>
      <MDBDropdownToggle>Role</MDBDropdownToggle>
      <MDBDropdownMenu>
        <MDBDropdownItem link value={"ceva"} onClick={handleSelect}>Student</MDBDropdownItem>
        <MDBDropdownItem link onClick={handleSelect}>Teacher</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
    <p>  </p>
    <p>  </p>
        <p>Enter your password:</p>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={e=>{
        setuserPassword(e.target.value);}}/>
        
        <MDBBtn className="mb-4"  onClick={registerApi}>Register</MDBBtn>
       
        <div className="text-center">
          <p>Already have an account? <a href="/">Login</a></p>
         
        </div>
  
      </MDBContainer>
    );
}

  export default Register;