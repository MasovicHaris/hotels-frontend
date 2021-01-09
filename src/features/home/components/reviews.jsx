import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { Divider, Avatar, Grid, Paper, Button } from "@material-ui/core";
import { handlePostReview, handleGetReviews } from '../actions/home-actions';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'block',
      flexDirection: 'column',
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: 800,
    },
    image: {
      width: 300,
      height: 300,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      margin: "10px",
      marginLeft: "660px"
    }
  }));



export default function Review() {
    const classes = useStyles();
    const imgLink = '../../../../user-logo.png'
    const reviews = useSelector(state => state.hotels.reviews);
    const hotels = useSelector(state => state.hotels);
    const user = useSelector(state => state.auth);
    const currentHotel = useSelector(state => state.hotels.currentHotel);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(handlePostReview("amir1", 3, "other description", "5e95d37ced6f16010b616dee"));
        dispatch(handleGetReviews("5e95d37ced6f16010b616dee"));
    }

    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let desc = `${name}`
        dispatch(handlePostReview("amir1", value, desc, currentHotel._id));
        dispatch(handleGetReviews("5e95d37ced6f16010b616dee"));
    }

  console.log("u", reviews)
  console.log("current", currentHotel)

  return (
    <div className={classes.root}>
      <h1>Reviews for hotel </h1>
      {reviews.map((review) => {
      return <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid justifyContent="left" item>
            <h4 style={{ margin: 0, textAlign: "left" }}>{review.author}</h4>
            <p style={{ textAlign: "left" }}>
            {review.description}
            
            </p>
            <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly />
            <br></br>
            <IconButton aria-label="like" className={classes.margin} onClick={handleOnClick}>
              
          <ThumbUpIcon /> </IconButton>
          <IconButton aria-label="unlike" className={classes.margin}>
          <ThumbDownIcon /> </IconButton>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        
      </Paper>
      })}

      <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
      <Rating name="half-rating-read" defaultValue={0} value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }} />
          <TextField multiline fullWidth rows={4}  id="outlined-basic" label="Leave review..." variant="outlined" value={name}
          onChange={e => setName(e.target.value)}/>    
          <Button type="submit" value="Submit" className={classes.button} variant="contained" color="primary"  >Submit </Button>
      </form>
      </Paper>
    </div>
  );
}
