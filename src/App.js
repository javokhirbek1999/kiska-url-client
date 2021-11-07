import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import './App.css';
import PostLoadingComponent from './components/PostLoading'
import Posts from './components/Posts'
import Stats from './components/Stats';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading:false,
    posts:null,
  });

  useEffect(() => {
    setAppState({loading:true});
    const apiURL = 'https://personal-blog-app-api.herokuapp.com/apidsds/';
    fetch(apiURL)
      .then((data) => data.json())
      .then((posts) => {
          console.log(posts)
          setAppState({ loading: false, posts: posts}); 
      });
  },[setAppState]);

  return (
      <div className='App'>
          {/* <h1>Paste the URL</h1> */}
          <TextField id="outlined-basic" label="Paste the URL" variant="outlined" style={{marginTop: '70px', marginBottom: '20px'}}/>
          <Button id="contained-basic" variant="contained" style={{marginTop: '70px', marginBottom: '20px', marginLeft: '10px'}}>Go</Button>
          <PostLoading isLoading={appState.loading} posts={appState.posts} />
          <Stats id="stats-basic" style={{marginTop: '100px', marginBottom: '50px'}}/>
      </div>
  )
}

export default App;