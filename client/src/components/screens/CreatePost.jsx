
import react, { useState } from "react";

import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
// import "./CreatePost.css";
// import 'react-toastify/dist/ReactToastify.css';


import { StyledEngineProvider } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

import Select from 'react-select';


function CreatePost() {
    const options = [
        { value: 'sport', label: 'sport' },
        { value: 'PersonalGrowth', label: 'PersonalGrowth' },
        { value: 'Data structure', label: 'Data structure' },
        { value: 'Finance', label: 'Finance' },
    ];

    const [softcopy, setSoftcopy] = useState("");
    const [type, setType] = useState(options[0]);
    const [btype, setBtype] = useState("sport");
    const [bookname, setBookname] = useState("");
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState();

    const [photourl, setPhotourl] = useState();
    const navigate = useNavigate();
    const [progress, setProgress] = useState();
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);

    function handledep(e) {
        console.log(e);
        setBtype(e.value);
        setType(e);

    }
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    function onFileUpload(e) {

        e.preventDefault();
        if (!softcopy || !type || !bookname || !author || !value || !photourl) {
            return toast.warning("Please provide all details");

        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                softcopy: softcopy,
                type: btype,
                bookname: bookname,
                author: author,
                rating: value,
                photourl: photourl

            })
        };
        fetch('/createpost', requestOptions)
            .then(res => res.json())
            .then(data => {
                JSON.stringify(data)

                if (data.error) {
                    return toast.warning(data.error)

                }
                else {
                    toast.success(data.message);
                    navigate('/ahome')
                }
            }).catch(err => {
                return toast.warning("not posted")
            });


    }

    return (
        <div className="aline">
        <div className="container active">
            <div className="forms">
                <div className="form add_book">
                        <span className="title">Add book details</span>

                        <form action="#">
                            <div className="input-field">
                                <input type="text" placeholder="Enter PDF URl"  value={softcopy} onChange={(e) => setSoftcopy(e.target.value)}required/>
                                <i class="uil uil-brackets-curly"></i>
                            </div>
                            <div className="input-field">
                                <input type="text" placeholder="Name of book" maxLength={255} value={bookname} onChange={(e) => setBookname(e.target.value)} required/>
                                <i class="uil uil-book"></i>
                            </div>
                            <div className="input-field">
                                select type
                                <Select className="postinput dep"
                                    options={options}
                                    value={type}
                                    onChange={handledep}
                                >
                                </Select>
                            </div>
                            <div className="input-field">
                                <input type="text" className="password" placeholder="Book Author" value={author} onChange={(e) => setAuthor(e.target.value)} required/>
                                <i className="uil uil-user"></i>
                            </div>
                            <div className="input-field">
                            <StyledEngineProvider injectFirst>
                                <h3>rating : </h3>
                                <Box
                                    sx={{
                                        width: 400,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                        <Rating
                                            name="hover-feedback large"
                                            value={value}
                                            precision={0.5}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                        </Box>
                            </StyledEngineProvider>
                            </div>

                            <div className="input-field">
                                <input type="text" className="password" placeholder="Phote URl"  value={photourl} onChange={(e) => setPhotourl(e.target.value)}required/>
                                <i class="uil uil-image-plus"></i>
                            </div>

                            <div className="input-field button">
                                <input type="button" value="Submit" onClick={onFileUpload}/>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CreatePost;

//  <div className="post-area" >
// <Card className="post-card">
//     <Card.Body>
//         <Card.Title>Upload book with following details</Card.Title>
//         <Card.Text>

//         </Card.Text>
//         <form >
//             <div className="card input-field">
//                 <input type="text" className="postinput" placeholder="pdf url" value={softcopy} onChange={(e) => setSoftcopy(e.target.value)} />
//                 <input type="text" className="postinput" placeholder="bookname" maxLength={255} value={bookname} onChange={(e) => setBookname(e.target.value)}></input>
//                 {/* <input type="text" className="postinput" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)}></input> */}
//                 <div className="postinput">
//                     select type
//                     <Select className="postinput dep"
//                         options={options}
//                         value={type}
//                         onChange={handledep}

//                     >
//                     </Select>
//                 </div>

//                 <input type="text" className="postinput" style={{ height: "auto" }} */}
                //     placeholder="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                // <input type="text" className="postinput" style={{ height: "auto" }}
                //     placeholder="photo url" value={photourl} onChange={(e) => setPhotourl(e.target.value)} />
                // <StyledEngineProvider injectFirst>
                //     <h3>rating : </h3>
                //     <Box
                //         sx={{
                //             width: 400,
                //             display: 'flex',
                //             alignItems: 'center',
                //         }}
                //     >
                //         <Rating
                //             name="hover-feedback large"
                //             value={value}
                //             precision={0.5}
                //             getLabelText={getLabelText}
                //             onChange={(event, newValue) => {
                //                 setValue(newValue);
                //             }}
                //             onChangeActive={(event, newHover) => {
                //                 setHover(newHover);
                //             }}
                //             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                //         />
                //         {value !== null && (
//                             <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
//                         )}
//                     </Box>
//                 </StyledEngineProvider>
//                 <button className="btn waves-effect waves-light #66bb6a green lighten-1 "
//                     onClick={onFileUpload}
//                 >
//                     Post
//                 </button>

//             </div>
//         </form>
//     </Card.Body>

// </Card>

// </div>