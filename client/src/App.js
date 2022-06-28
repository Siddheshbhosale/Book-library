import React, { useEffect, useContext, useReducer, createContext } from "react";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
// import './App.css';
import { useNavigate } from 'react-router-dom';
import Login from './components/screens/Login.jsx';
import Signup from './components/screens/Signup.jsx';
import Alogin from './components/screens/Alogin.jsx';
import Ahome from './components/screens/Ahome.jsx';
import Asignup from './components/screens/Asignup.jsx';
import Home from './components/screens/Home'
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer.js'


export const UserContext = createContext();
const Routing = () => {
      const navigate = useNavigate();
      const { state, dispatch } = useContext(UserContext);
      const user = JSON.parse(localStorage.getItem("user"));

      useEffect(() => {
        if (user) {
          dispatch({ type: "USER", payload: user })
        }
        else {
          navigate('/login');
        }
      }, []);

      return (
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/alogin" element={<Alogin />}></Route>
          <Route path="/asignup" element={<Asignup />}></Route>
          <>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/ahome" element={<Ahome />}></Route>
            <Route path="/createpost" element={<CreatePost />}></Route>
          </>
        </Routes>
      )
}




function App() {
      const initialStates = {
        user: {},
        error: null
      };
      const [state, dispatch] = useReducer(reducer, initialStates);

      return (
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </UserContext.Provider>
      );
}
export default App;

