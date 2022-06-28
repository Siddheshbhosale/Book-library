import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()
function Asignup() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Cred, setCred] = useState("");

  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  if(state && state._id)
    {
        navigate("/ahome")
    }

  const postData = (e) => {
    try {
      e.preventDefault();
      if (!Name || !Password || !Email) {
        return toast.warning("Please provide all details");

      }
     
       {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          },
          body: JSON.stringify({ 
              name: Name,
              email: Email,
              password: Password,
              cred:Cred
            
          })
        };
        fetch('/asignup', requestOptions)
        .then(res => res.json())
        .then(data => {
          JSON.stringify(data)
          if (data.error) {
            toast.warning(data.error)
          }
          else {
            toast.success(data.message);
            navigate('/login')
          }
        }).catch(err => {
          return toast.warning("account not created2")
        });

      
       } 
    }
    catch (err) {
      return toast.warning("account not created3")
    }
  }

  return (
    <div className="aline">
        <div className="container active">
            <div className="forms">
                <div className="form signup">
                        <span className="title">New Admin Registration</span>

                        <form action="#">
                            <div className="input-field">
                                <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={Name} required/>
                                <i className="uil uil-user"></i>
                            </div>
                            <div className="input-field">
                                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={Email} required/>
                                <i className="uil uil-envelope icon"></i>
                            </div>
                            <div className="input-field">
                                <input type="password" className="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} value={Password} required/>
                                <i className="uil uil-lock icon"></i>
                                <i className="uil uil-eye-slash showHidePw"></i>
                            </div>
                            <div className="input-field">
                                <input type="password" className="password" placeholder="company credentials" onChange={(e) => setCred(e.target.value)} value={Cred}/>
                                <i className="uil uil-lock icon"></i>
                                <i className="uil uil-eye-slash showHidePw"></i>
                            </div>

                            <div className="input-field button">
                                <input type="button"onClick={postData} value="Register Now"/>
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">
                              <Link to='/alogin'>Already have account?</Link>
                            </span>
                        </div>
                </div>
                
            </div>
        </div>
      </div>
    // <div>
    //   <div className="wcard">
    //     <Card style={{ width: '18rem' }} className="cards .input-field">
    //       <div className="auth-card">
    //         <h2>books admin</h2>
    //         <input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" value={Name} />
    //         <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={Email} />
    //         <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={Password} />
    //         <input type="password" placeholder="company credentials" onChange={(e) => setCred(e.target.value)} value={Cred} />
          
    //         <button className="btn waves-effect waves-light #66bb6a green lighten-1"
    //           onClick={postData}
    //         >
    //           Signup
    //         </button>
    //         <h6>
    //           <Link to='/alogin'>Already have account?</Link>
    //         </h6>
            
    //       </div>
    //       {

    //       }
    //     </Card>

    //   </div>
    // </div>
  )
}

export default Asignup;