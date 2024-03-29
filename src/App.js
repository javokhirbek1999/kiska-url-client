import React, { useEffect, useState } from 'react'
import './App.css';
import axiosInstance from './axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link as MatUIlink } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@material-ui/core';


function App() {


  const [statsData, setStatsData] = useState({
    loading: true,
    data: [],
  });

  const initialData = Object.freeze({
    url: null,
  });

  const [formData, updateFormData] = useState(initialData);
  const [shortURL, setShortURL] = useState("")

  const handleChange = (e) => {
    updateFormData({
      url: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('urls/', {
      url: formData.url,
    }).then((res) => {
      setShortURL(res.data.shortURL)
    });
  }
  
  useEffect(() => {
    axiosInstance.get('urls/').then((res) => {
      // Get only latest 10 activities (shortened urls)
      const allData = res.data.slice(0,10);
      setStatsData({loading: false, data: allData});
    }).catch((err) => {
      console.log(err);
    });
  },[]);

  return (
    <div className="App">
      { localStorage.getItem("token") === null ? <><h1>Please Log In </h1> <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    component={NavLink}
                    to="/login">
                            Login
                    </Button> </>:
                    <> 
                    <h1>Short Links, Better Usability</h1>
                    <TextField id="outlined-basic" label="Past URL here" variant="outlined" onChange={handleChange}/>
                    <Button 
                      href="#"
                      color="primary"
                      variant="contained"
                      id="url-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Go
                    </Button>
                    </>
      }
      <div id="results-container" component={Paper}>
                  <>
                  { statsData.loading && shortURL === ""?
                    <CircularProgress />: <a href={shortURL} target="_blank" rel="noreferrer"><h1>{shortURL.substr(8,)}</h1></a>
                  }
                  </>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{midWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Short URL</TableCell>
              <TableCell align="center">Original URL</TableCell>
              <TableCell align="center">Shortened</TableCell>
              <TableCell align="center">Visited</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statsData.data.map(item => {
              var date = new Date(item.date_created.split('-')[0], item.date_created.split('-')[1]-1,item.date_created.split('-')[2].substr(0,2));
              var diff = new Date()-date;
              var date_diff = new Date(diff);
              var now = "";
              var days = parseInt(Math.floor(date_diff/1000/60/(60*24)));
                if (days === 0){
                  now += "Today";
                }else if (days===1) {
                  now += "Yesterday";
                } else if (days > 1 && days < 30) {
                  now += days + " days ago";
                } else if (days > 30 && days < 365) {
                  var months = parseInt(days/30);
                  if (months===1) {
                    now += "a month ago";
                  } else {
                    now += months + " months ago"
                  }
                } else {
                  var years = parseInt(days/365);
                  if (years===1) {
                    now += "a year ago";
                  } else {
                    now += years + " years ago";
                  }
                }
              return ( <>
              <TableRow 
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{now}</TableCell>
                  <TableCell component="th" scope="row" align="center"><NavLink to={"/profile/"+item.get_user_username}>{item.get_user_username}</NavLink></TableCell>
                  <TableCell align="center"><MatUIlink href={item.shortURL} target="_blank">{item.shortURL.substr(8,)}</MatUIlink></TableCell>
                  <TableCell align="center"><MatUIlink href={item.url} target="_blank">{item.url.substr(0,25)}...</MatUIlink></TableCell>
                  <TableCell align="center">{item.shortened}</TableCell>
                  <TableCell align="center">{item.visited}</TableCell>
              </TableRow>
              </>)
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;