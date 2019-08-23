import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    // console.log('id', props.match.params.id)
    // console.log(id, movie.id)
    const movieInArr = props.movies.find(m => `${m.id}` === id);
    // console.log('movieInArr', movieInArr);
    if (movieInArr) setMovie(movieInArr);
  }, [props.movies, props.match.params.id]);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log('res from UpdateMovieForm axios.put', res)
        // props.setMovies([...props.movies, movie])
        // setMovie(initialMovie);
        props.history.push('/')
      })
      .catch(err => console.log(err.response));
  }

  const handleChange = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [event.target.name]: value
    });
    // console.log(movie)
  };

  const starsHandleChange = index => e => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
      return starIndex === index ? e.target.value : star;
    })});
  };

  const addStar = event => {
    event.preventDefault();
    setMovie({...movie, stars: [...movie.stars, '']})
  }

  // const starsHandleChange = event => {
  //   event.persist();
  //   // const updatedStars = [...movie.stars];
  //   // updatedStars[movie.id] = event.target.value;
  //   setMovie({
  //     ...movie,
  //     [event.target.name]: event.target.value
  //   })
  //   console.log(movie)
  // }

  if (!movie) {
    return (
      <div className='loading-movie'>Loading...</div>
    )
  }

  return (
    <div className='updateMovieForm'>
      <h2>Update Movie</h2>
      <form onSubmit={event => handleSubmit(event)}>
        <input 
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='title'
          value={movie.title}
        />
        <input
          type='text'
          name='director'
          onChange={handleChange}
          placeholder='director'
          value={movie.director}
        />
        <input
          type='text'
          name='metascore'
          onChange={handleChange}
          placeholder='metascore'
          value={movie.metascore}
        />
        {movie.stars.map((starName, index) => {
          return <input
            key={index}
            type='text'
            // name='starName'
            onChange={starsHandleChange(index)}
            placeholder='star'
            value={starName}
          />
        })}
        <button onClick={addStar}>Add a Star</button>
        <button className='update-button'>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;