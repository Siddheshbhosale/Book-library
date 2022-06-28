import React, { useState , useEffect,useContext} from "react";
// import { Card} from 'react-bootstrap';
import { Link,useNavigate  } from 'react-router-dom';
import {UserContext} from '../../App'
import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./Login.css"

toast.configure()
function Alogin() {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate=useNavigate();
  const [data, setData] = useState([]);
    const [showCom, setCom] = useState(false);
    const { state, dispatch } = useContext(UserContext);
    if(state && state._id)
  {
      navigate("/ahome")
  }
    useEffect(() => {
      if(state && state._id)
    {
        navigate("/ahome")
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
    fetch('/alogin', requestOptions)
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
          localStorage.setItem("type",JSON.stringify("admin1000@145612154466446"));
          localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
          
          
          navigate('/ahome')
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
                          <span className="title">Admin Login</span>
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
                              <span className="">
                                <Link to='/login'>Login as user </Link>
                                <h6>
                                  *<Link to='/asignup'>new to the company?</Link>*
                               </h6>
                              </span>
                          </div>
                      </div>
              </div>
            </div>
          </div>
      )
    }
    
    export default Alogin;
    // <div>
   
    //  <div className="wcard">
    //  <Card  className="cards .input-field">
    //    <div className="auth-card">
    //    <h2>books</h2>
    //    <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={Email}/>
    //    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={Password}/>
    //    <button className="btn waves-effect waves-light #66bb6a green lighten-1" onClick={postData}>
    //    login
    //    </button>
    //    <h6>
    //        <Link to='/asignup'>new to the company?</Link>
    //    </h6>
    //    </div>
    //    </Card>

    //  </div>
    //  </div>