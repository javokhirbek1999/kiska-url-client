import React, { useEffect, useState } from 'react'
// import { TextField, Button } from '@material-ui/core';
import './App.css';
import PostLoadingComponent from './components/PostLoading'
import Posts from './components/Posts'
// import StatsContainer from './components/StatsContainer'
import axiosInstance from './components/axios/login';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  useEffect(() => {
    axiosInstance.get().then((res) => {
      const allPosts = res.data;
      console.log(allPosts);
      setAppState({ loading: false, posts: allPosts});
      console.log(res.data)
    });
  }, [setAppState]);

  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}

export default App;