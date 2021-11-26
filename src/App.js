import React, { useEffect, useState } from 'react'
// import { TextField, Button } from '@material-ui/core';
import './App.css';
import PostLoadingComponent from './components/PostLoading'
import Posts from './components/Posts'
// import StatsLoadingComponent from './components/StatsContainer'
// import Stats from './components/Stats';
import axiosInstance from './axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link as MatUIlink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@material-ui/core';


function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: [],
  });

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

    axiosInstance.post('urls/org/', {
      url: formData.url,
    }).then((res) => {
      setShortURL(res.data.shortURL)
    });
  }
  
  useEffect(() => {
    // axiosInstance.get('urls/org/').then((res) => {
    //   const allPosts = res.data;
    //   console.log(allPosts);
    //   setAppState({ loading: false, posts: allPosts});
    //   console.log(res.data)
    // });
    axiosInstance.get('urls/short/').then((res) => {
      const allData = res.data;
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
                    // className={classes.link}
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
                  { shortURL === ""?
                    <CircularProgress />: <a href={shortURL} target="_blank"><h1>{shortURL}</h1></a>
                  }
                  </>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{midWidth: 650}} aria-lable="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Short URL</TableCell>
              <TableCell align="center">Original URL</TableCell>
              <TableCell align="center">Visited</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statsData.data.map(item => {
              return ( <>
              <TableRow 
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">{item.get_username}</TableCell>
                  <TableCell align="center"><MatUIlink href={item.shortURL}>{item.shortURL}</MatUIlink></TableCell>
                  <TableCell align="center"><MatUIlink href={item.get_original_url}>{item.get_original_url.substr(0,25)}...</MatUIlink></TableCell>
                  <TableCell align="center">{item.visited}</TableCell>
              </TableRow>
              </>)
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <StatsLoading isLoding={statsData.loading} data={statsData.data}/> */}
    </div>
  );
}

export default App;