import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Routes, Route } from 'react-router-dom'

//Componenets
import NavBar from './NavBar'
import About from '../../Common/Components/About'

//styling
import '../Styling/Login.css'

function Login() {

  const [UserName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [Remember, setRemember] = useState(false)
  const [Pending, setPending] = useState(false)

  const Login = event => {
    // 👇️ prevent page refresh
    event.preventDefault();
    if (UserName === "" || password === "") {
      alert("Please fill all fields")
      return
    }
    console.log(UserName)
    console.log(password)
    setPending(true)
    axios.get(`/Login/${UserName}/${password}`).then((response) => {
      if (response.data.status != 200) {
        alert(response.data.Message)
        setPending(false)
        return
      }
      else {
        const Type = response.data.Type
        const User_ID = response.data.User_ID
        setPending(false)
        //local Storage
        if (Remember) {
          localStorage.setItem("Beta_user", JSON.stringify(response.data))
        }
        //redirect
        window.location.href = `/${Type}/${User_ID}`
      }
    })
      .catch((error) => alert(error))

  }


  //Hide/show password
  var x = document.getElementById("login-form-password");   // Input
  var s = document.getElementById("Layer_1");               // Show pass
  var h = document.getElementById("Layer_2");               // Hide pass

  function togglePass() {
    if (x.type === "password") {
      x.type = 'text';
      s.style.display = 'none';
      h.style.display = 'inline';
    } else {
      x.type = 'password';
      s.style.display = 'inline';
      h.style.display = 'none';
    }
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <div className='LoginConatiner'>
            <form onSubmit={Login} className="LoginForm">
              <label><h2>Log in</h2></label>
              <label>
                User Name
                <input type="text" onChange={(e) => { setUserName(e.target.value) }} placeholder="User Name" />
              </label>
              <label className='Password'>
                Password
                <div id='inputcontainer'>
                  <input type="password" id="login-form-password" name="os_password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }}></input>

                  <svg id="Layer_1" onClick={togglePass} data-name="Layer 1" style={{ width: "25" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-glyph</title><path d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z" /></svg>
                  <svg id="Layer_2" onClick={togglePass} data-name="Layer 2" style={{ width: "25", display: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>eye-disabled-glyph</title><path d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z" /></svg>
                </div>
                {/* <input type="password" onChange={(e) => { setPassword(e.target.value) }} /> */}
              </label>
              <label>
                <input type="checkbox" onChange={(e) => { setRemember(e.target.checked) }} />
                Remember Me
              </label>
              <button disabled={Pending}>log in</button>

              <label>don't have an account? <Link to='/Signup'>Sign Up</Link></label>


            </form>
            <h3>Forgot password? contact admin to reset</h3>
          </div>
        } />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  )
}

export default Login