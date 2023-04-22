import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MovieRating({rating}) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex',right:15, top:55 }}>
      <CircularProgress color={rating > 8 ? "success" : "warning"} variant="determinate" value={rating*10} size={30}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" component="div" color="inherit">
          {`${rating}`}
        </Typography>
      </Box>
    </Box>
  );
}
