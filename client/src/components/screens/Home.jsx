import React, { useState, useEffect, useContext } from "react";
// import { Card, Button } from 'react-bootstrap';
import { saveAs } from "file-saver";
import { UserContext } from "../../App";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Home.css"
import Avatar from 'react-avatar';
import bg from "./BGbooks.png";

const colors = {
  background : `url('${bg}')`
}

function Home() {
    const [data, setData] = useState([]);
    const [showCom, setCom] = useState();
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [type, settype] = useState("PersonalGrowth");
    const [color, setColor] = useState(colors.background);
    
    useEffect(() => {
        document.body.style.backgroundImage = `url('${bg}')`;
        document.body.style.backgroundRepeat = 'no-repeat';
        // document.body.style.background = '#d7dcea';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        fetch('/home', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
                "type" : type
            }
        }).then(res => res.json())
            .then(result => {
                console.log("checking ")
                setData(result.posts);
            })
    }, []);

    function booktype()
    {
      setData([]);
        fetch('/home', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt'),
                "type" : type
            }
        }).then(res => res.json())
            .then(result => {
                console.log("checking ")
                setData(result.posts);
            })
    }
    return (<>
        <div className="header_home">
            <h1 style={{width:'100px',border:'2px solid blue'}}>S</h1>
            <h1 className="title">Book's recommendation</h1>
            <div className="blogout" onClick={() => {
                      localStorage.clear();
                      dispatch({ type: "CLEAR" });
                      navigate('/')
              }}variant="primary">Logout </div>
        </div>
      <div className="Hcontainer">
          <h2 className="info">Click the following option as per your interest</h2>
            <div className="Hbuttons">
              <button onClick={(e)=>{settype("Finance");
              booktype()}}>Finance</button>
                <button onClick={(e)=>{settype("sport");
              booktype()}}>sports</button>
                <button onClick={(e)=>{settype("PersonalGrowth");
              booktype()}}>PersonalGrowth</button>
                <button onClick={(e)=>{settype("Data structure");
              booktype()}}>Data structure</button> 
              
            
      </div>

      <div className="types">{type} 👇</div>
      <div className="download">
        (Click on book Image to download it's softcopy)
      </div>

      <div className="bookscontainer">
        {data.map((book) => (
            
          <div className="bookItem">
            <a href={book.softcopy}>
              <img
                className="bookImage"
                src={book.photourl}
                alt={book.bookname}
              ></img>
            </a>
            <div className="bookDetails">
              <div className="bookName">{book.bookname} </div>
              <div className="bookAuthor">{book.author}</div>
              <div className="bookRating"> {book.rating} </div>
            </div>
          </div>
        ))}
        <hr></hr>
      </div>
            <h2>...thanks for visiting</h2>
    </div>
    </> 
    )
}

export default Home;