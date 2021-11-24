import React, { useEffect, useState } from 'react'
// import { TextField, Button } from '@material-ui/core';
import './App.css';
import PostLoadingComponent from './components/PostLoading'
import Posts from './components/Posts'
// import StatsLoadingComponent from './components/StatsContainer'
// import Stats from './components/Stats';
import axiosInstance from './axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Link } from '@material-ui/core';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  // const StatsLoading = StatsLoadingComponent(Stats);
  const [appState, setAppState] = useState({
    loading: true,
    posts: [],
  });

  const [dat, setData] = useState([]);

  const [statsData, setStatsData] = useState({
    loading: true,
    data: [],
  });

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
    // fetch('http://127.0.0.1:8000/api/urls/short/').then((res) => res.json()).then((data) => setData(data))
  },[]);
  console.log(typeof statsData.data);
  console.log(statsData.data)

  const d = [{
    "dude": "Jame",
    "age": 25,
    "towm": "Los Angeles"
  },
  {
    "dude": "James",
    "age": 28,
    "towm": "Los Angeles"
  },
  {
    "dude": "Jam",
    "age": 29,
    "towm": "Los Angeles"
  },]
  console.log(dat)
  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />

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
                  <TableCell align="center"><Link href={item.shortURL}>{item.shortURL}</Link></TableCell>
                  <TableCell align="center"><Link href={item.get_original_url}>{item.get_original_url.substr(0,25)}...</Link></TableCell>
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