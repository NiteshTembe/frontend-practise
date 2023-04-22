import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box, Container} from "@mui/system";
import { ShowAlertContext } from "./context/AlertContext";
import { useNavigate, useParams } from "react-router-dom";
import { moviesAPI } from "./global/global";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function EditMovie() {
  const { id } = useParams();
  const [ moviesData , setMoviesData] = useState(null);
  const [, setOpenAlert] = useContext(ShowAlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${moviesAPI}/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setMoviesData(data);
        } else {
          setOpenAlert({ type: "warning", msg: "Data Not Available!" });
          navigate("/");
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [id, navigate, setOpenAlert]);

  if(moviesData)
  return (
      <EditMovieDetails data={moviesData}/>
  );
  else return null
}

const EditMovieDetails = ({data}) =>{
  const [title, setTitle] = useState(data.title);
  const [overview, setOverview] = useState(data.overview);
  const [genres, setGenres] = useState(data.genres.join(","));
  const [posterPath, setPosterPath] = useState(data.poster_path);
  const [releaseDate, setReleaseDate] = useState(data.release_date);
  const [language, setLanguage] = useState(data.original_language);
  const [certification, setCertification] = useState(data.certification);
  const [rating, setRating] = useState(data.vote_average);
  const [trailer, setTrailer] = useState(data.trailer_yt);
  const [, setOpenAlert] = useContext(ShowAlertContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const genresArr = genres.split(",");
    const newData = {
        "genres": genresArr,
        "original_language": language,
        "overview": overview,
        "poster_path": posterPath,
        "release_date": releaseDate,
        "title": title,
        "vote_average": rating,
        "certification": certification,
        "trailer_yt": trailer
    };
    const res = await fetch(`${moviesAPI}/${data.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (res.status === 200) {
      setOpenAlert({
        type: "success",
        msg: `Movie ${title} Edited Successfully !`,
      });
    } else {
      setOpenAlert({ type: "error", msg: res.statusText });
    }
    navigate("/");
  };
  return (<Container component="main" maxWidth="sm">
  <Button onClick={()=>navigate(-1)}><ArrowBackIosIcon/>back</Button>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Box
      component="form"
      method="POST"
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="title"
            name="title"
            value={title}
            required
            fullWidth
            id="title"
            label="Movie Title"
            onChange={(e) =>
              setTitle(e.target.value.split(" ").join(""))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="posterPath"
            value={posterPath}
            label="Poster Path"
            name="poster_path"
            onChange={(e) => setPosterPath(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="trailer"
            value={trailer}
            label="YT Trailer Path"
            name="trailer"
            onChange={(e) => setTrailer(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            id="overview"
            value={overview}
            label="Summary"
            name="overview"
            onChange={(e) => setOverview(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="certification-label">Certification</FormLabel>
            <RadioGroup
              row
              aria-labelledby="certification-label"
              name="certification"
              required
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
            >
              <FormControlLabel
                value="PG"
                control={<Radio />}
                label="PG"
              />
              <FormControlLabel
                value="R"
                control={<Radio />}
                label="R"
              />
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="NA"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="language"
            value={language}
            label="Language"
            name="language"
            onChange={(e) => setLanguage(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            required
            max={10}
            id="rating"
            value={rating}
            label="Rating"
            name="rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="releaseDate"
            value={releaseDate}
            label="Release Date"
            name="releaseDate"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="genres"
            value={genres}
            label="Genres"
            name="genres"
            onChange={(e) => setGenres(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="success"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save
      </Button>
    </Box>
  </Box>
</Container>)
}
