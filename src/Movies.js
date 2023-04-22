import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Badge, ButtonGroup, Grid, Paper, Popover } from "@mui/material";
import styled from "@emotion/styled";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MovieRating from "./MovieRating";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { moviesAPI } from "./global/global";
import { ShowAlertContext } from "./context/AlertContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import ReviewsIcon from "@mui/icons-material/Reviews";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`${moviesAPI}`);
      const data = await response.json();
      setMovies(data);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  const [page, setPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");

  const [filteredMovies, setFilteredMovies] = useState([...movies]);
  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => {
        if (movie.title.toLowerCase().includes(searchFilter.toLowerCase()))
          return movies;
        else return null;
      })
    );
  }, [searchFilter, movies]);

  const moviesPerPage = filteredMovies.slice(page * 10 - 10, page * 10);

  //code to run on page change
  const handleChange = (event, value) => {
    setPage(value);
  };

  //style for each card of movie
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#999",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  if (movies.length) {
    return (
      <Stack spacing={2}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignSelf: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Movie"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            inputProps={{ "aria-label": "search movie" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Grid container maxWidth={"100%"} spacing={1} columns={60}>
          {moviesPerPage.map((movie, index) => (
            <Grid
              item
              sx={{ my: 1 }}
              xs={30}
              sm={20}
              md={15}
              lg={12}
              key={index}
            >
              <Item>
                <SingleMovie key={index} {...movie} func={fetchData} />
              </Item>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(filteredMovies.length / 10)}
          page={page}
          onChange={handleChange}
          style={{ marginInline: "auto" }}
        />
      </Stack>
    );
  } else return null;
};

const SingleMovie = ({
  id,
  title,
  poster_path,
  overview,
  vote_average,
  func,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [, setOpenAlert] = useContext(ShowAlertContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  // DELETE request using fetch with async/await
  async function deleteMovie(id) {
    await fetch(`${moviesAPI}/${id}`, { method: "DELETE" });
    setOpenAlert({ type: "success", msg: `Movie Deleted Successfully !` });
    func();
  }

  return (
    <Card sx={{ minWidth: 154 }}>
      <CardMedia component="img" alt={title} image={`${poster_path}`} />
      <Badge badgeContent={<MovieRating rating={vote_average} />}>
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            sx={{ height: 56 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxHeight: 36, overflow: "hidden" }}
          >
            {overview}
          </Typography>
        </CardContent>
      </Badge>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            sx={{ border: 0 }}
            size="small"
            onClick={() => navigate(`/movie/${id}`)}
          >
            <PreviewIcon />
          </Button>
          <Button
            sx={{ border: 0 }}
            size="small"
            onClick={() => navigate(`/movie/edit/${id}`)}
            color="warning"
          >
            <EditIcon />
          </Button>
          <Button
            sx={{ border: 0 }}
            size="small"
            onClick={() => deleteMovie(id)}
            color="error"
          >
            <DeleteIcon />
          </Button>
          <Button
            sx={{ border: 0 }}
            size="small"
            aria-describedby={"overview"}
            onClick={handleClick}
          >
            <ReviewsIcon/>
          </Button>
        </ButtonGroup>
        <Popover
          id={"overview"}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Typography sx={{ maxWidth: 200, mx: 1, maxHeight: 200 }}>
            {overview}
          </Typography>
        </Popover>
      </CardActions>
    </Card>
  );
};

export default Movies;
