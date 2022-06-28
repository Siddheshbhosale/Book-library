import React, { useState , useEffect,useContext} from "react";
import { Link,useNavigate  } from 'react-router-dom';
import {UserContext} from '../../App'
import {toast} from 'react-toastify';
import './Login.css'

toast.configure()
function Login() {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [showCom, setCom] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  if(state && state._id)
  {
    navigate("/home")
  }

  useEffect(() => {
        document.body.style.backgroundImage = `url('https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
    if(state && state._id)
    {
        navigate("/home")
    }
  }, [])
        
    const postData = () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: Email,
          password: Password
        })
    };
    fetch('/login', requestOptions)
      .then(res => res.json())
      .then(data => {
        JSON.stringify(data)
        if (data.error) {
          toast.warning(data.error)
        }
        else
        {
          toast.success("login succesful");
          localStorage.setItem('jwt',data.token)
          localStorage.setItem("type",JSON.stringify("user"))
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          navigate('/home')
        }
      }).catch(err=>{
            console.log(err);
      });
  }
  
    return (
      <div className="aline">
      <div className="container">
              <div className="forms">
                      <div className="form login">
                          <span className="title">Login</span>
                          <form action="#">
                              <div className="input-field">
                                  <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={Email} required/>
                                  <i className="uil uil-envelope icon1"></i>
                              </div>
                              <div className="input-field">
                                  <input type="password" className="password" onChange={(e) => setPassword(e.target.value)} value={Password} placeholder="Enter your password" required/>
                                  <i className="uil uil-lock icon1"></i>
                                  <i className="uil uil-eye-slash showHidePw"></i>
                              </div>

                              <div className="input-field button " onClick={postData}>
                                  <input type="button" value="Login Now"/>
                              </div>
                          </form>

                          <div className="login-signup">
                              <span className="" style={{display:"block"}}><Link to='/signup'>Don't have account?</Link>
                              </span>
                              <Link to='/alogin'>Admin login ?</Link>
                          </div>
                      </div>
              </div>
            </div>
          </div>
    )
}

export default Login;