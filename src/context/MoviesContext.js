import React, { createContext, useState } from "react";
import initial_data from '../data/movies.json'

export const MoviesContext = createContext();

const MovieApp = ({children}) => {
    const [ movies , setMovies ] = useState(initial_data)

    return (
        <MoviesContext.Provider value={[ movies , setMovies ]}>{children}</MoviesContext.Provider>
    )
}

export default MovieApp;