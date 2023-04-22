import React, { useContext, useState } from "react";
import {
  Button,
  CssBaseline,
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
import { useNavigate } from "react-router-dom";
import { moviesAPI } from "./global/global";

export function AddMovie() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [genres, setGenres] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [language, setLanguage] = useState("");
  const [certification, setCertification] = useState("");
  const [rating, setRating] = useState("");
  const [trailer, setTrailer] = useState("");
  const [, setOpenAlert] = useContext(ShowAlertContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
        "genres": genres.split(","),
        "original_language": language,
        "overview": overview,
        "poster_path": posterPath,
        "release_date": releaseDate,
        "title": title,
        "vote_average": rating,
        "certification": certification,
        "trailer_yt": trailer
    };
    const res = await fetch(`${moviesAPI}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (res.status === 200) {
      setOpenAlert({ type: "success", msg: "Movie Added" });
    } else {
      setOpenAlert({ type: "error", msg: "Something Went Wrong" });
    }
    navigate("/");
  };

  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="releaseDate"
                  value={releaseDate}
                  label="Release Date"
                  name="releaseDate"
                  onChange={(e) => setReleaseDate(e.target.value)}
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
              Add Movie
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
