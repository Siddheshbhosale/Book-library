import React, { useState, useEffect, useContext } from "react";

// import { Card, Button } from 'react-bootstrap';

import { saveAs } from "file-saver";
import { UserContext } from "../../App";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from 'react-avatar';
import './Home.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function Ahome() {
  const [data, setData] = useState([]);
  const [showCom, setCom] = useState();
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [type, settype] = useState("PersonalGrowth");

  useEffect(() => {
    fetch('/home', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
        "type": type
      }
    }).then(res => res.json())
      .then(result => {
        console.log("checking ")
        setData(result.posts);
      })
  }, []);

  function booktype() {
    setData([]);
    fetch('/home', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt'),
        "type": type
      }
    }).then(res => res.json())
      .then(result => {
        console.log("checking ")
        setData(result.posts);
      })
  }

  const submit = (id) => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
          deletePost(id)
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  };

  const deletePost = (id) => {
    console.log(id);
    fetch(`/deletepost/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        booktype();

      }).catch(function (error) {
        // Some Error occurred
      });
  }

  return (
    <div className="home">
      <div className="Hcontainer">
        <h1 className="title">Siddhesh Book's recommendation</h1>
        <h2 className="info">Click the following option as per your interest</h2>
        <div className="buttons">
          <button onClick={(e) => {
            settype("Finance");
            booktype()
          }}>Finance</button>
          <button onClick={(e) => {
            settype("sport");
            booktype()
          }}>sports</button>
          <button onClick={(e) => {
            settype("PersonalGrowth");
            booktype()
          }}>PersonalGrowth</button>
          <button onClick={(e) => {
            settype("Data structure");
            booktype()
          }}>Data structure</button>
          <button className="blogout" onClick={() => { //Button
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            navigate('/')
          }} variant="primary">Logout</button>
        </div>
        
        <button className="addbook" onClick={() => {   // Button
          navigate('/createpost')
        }} variant="primary">Add book</button>
        <div className="types">{type} 👇</div>
        <div className="download">
          (admin)
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
              <i className="material-icons" onClick={() =>
                submit(book._id)
              }>delete</i>
            </div>
          ))}
        </div>
      <hr></hr>
      </div>
      <h2>...thanks for visiting</h2>

    </div>


  )
}

export default Ahome;