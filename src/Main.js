import { Container } from '@mui/material'
import React from 'react'
import Movies from './Movies'
import { Routes , Route, Navigate } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { AddMovie } from './AddMovie';
import { EditMovie } from './EditMovie';
import { Page404 } from './Page404';

function Main() {
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
      <Routes>
        <Route path="/movie" element={<Movies/>} />
        <Route path="/" element={<Navigate replace to="/movie" /> } />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/movie/edit/:id" element={<EditMovie/>} />
        <Route path="/movie/add" element={<AddMovie/>} />
        <Route path="/*" element={<Page404/>} />
      </Routes>
      </Container>
  )
}

export default Main
