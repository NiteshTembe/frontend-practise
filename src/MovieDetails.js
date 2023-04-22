import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { moviesAPI } from "./global/global";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${moviesAPI}/${id}`);
          const data = await response.json();
          setMovie(data);
          
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id]);
  if(movie){
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
    <Button onClick={()=>navigate(-1)}><ArrowBackIosIcon/>back</Button>
      <Typography gutterBottom variant="h4" component="div">
        {movie.title}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs>
          <Item>
            <div className="container iframe-container">
              <iframe
                className="responsive-iframe"
                src={`${movie.trailer_yt}`}
                title={movie.title}
                allowFullScreen
              ></iframe>
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={5}>
          <Item>
          <Grid container spacing={2} sx={{ textAlign: "left", mb: 2 }}>
            <Grid item xs={2}>Summary </Grid><Grid item xs={10}>: {movie.overview}</Grid>
            <Grid item xs={2}>Genres </Grid><Grid item xs={10}>: {movie.genres.join()}</Grid>
            <Grid item xs={2}>Language </Grid><Grid item xs={10}>: {movie.original_language}</Grid>
            <Grid item xs={2}>Release Date </Grid><Grid item xs={10}>: {movie.release_date}</Grid>
            <Grid item xs={2}>Rating </Grid><Grid item xs={10}>: {movie.vote_average}</Grid>
          </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
  }
  else return null
};

export default MovieDetails;
