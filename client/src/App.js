import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm.js';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data)
      })
      .catch(err => console.log(err.response))
  }, [])

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        path='/update-movie/:id'
        render={props => {
          return <UpdateMovieForm {...props} movies={movies} setMovies={setMovies} />;
        }}
      />
      {/* <Route 
        path='/add-movie'
        render={props => {
          return <AddMovie {...props} />
        }}
      /> */}
    </>
  );
};

export default App;
