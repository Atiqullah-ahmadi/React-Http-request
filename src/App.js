import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./component/MoviesList";
import AddMovies from "./component/AddMovies";
import classes from "./component/App.module.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-b3628-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const loadedMovies = [];
      const data = await response.json();
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          peningText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    await fetch(
      "https://react-http-b3628-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section className={classes.section}>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler} className={classes.button}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
// import { useState, useEffect, useCallback, Fragment } from "react";
// import AddMovies from "./component/AddMovies";
// import MoviesList from "./component/MoviesList";
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const feitchDataHanlder = useCallback(async () => {
//     setIsLoading(true);
//     const response = await fetch("https://swapi.dev/api/films/");
//     const data = await response.json();
//     const DUMMY_MOVIES = data.results.map((movie) => {
//       return {
//         key: movie.episode_id,
//         id: movie.episode_id,
//         name: movie.title,
//         discription: movie.opening_crawl,
//         released: movie.release_date,
//       };
//     });
//     setMovies(DUMMY_MOVIES);
//     setIsLoading(false);
//   }, []);
//   useEffect(() => {
//     feitchDataHanlder();
//   }, [feitchDataHanlder]);
//   const addMovieHandler = (movie) => {
//     console.log(movie);
//   };
//   // const feitchDataHanlder = () => {
//   //   fetch("https://swapi.dev/api/films/")
//   //     .then((response) => {
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       const DUMMY_MOVIES = data.results.map((movie) => {
//   //         return {
//   //           id: movie.episode_id,
//   //           name: movie.title,
//   //           discription: movie.opening_crawl,
//   //           released: movie.release_date,
//   //         };
//   //       });
//   //       setMovies(DUMMY_MOVIES);
//   //     });
//   // };
//   return (
//     <Fragment>
//       <div>
//         <AddMovies onAddMovie={addMovieHandler} />
//       </div>
//       <div>
//         <MoviesList
//           DUMMY_MOVIES={movies}
//           isLoading={isLoading}
//           onClick={feitchDataHanlder}
//         />
//       </div>
//     </Fragment>
//   );
// }

// export default App;
