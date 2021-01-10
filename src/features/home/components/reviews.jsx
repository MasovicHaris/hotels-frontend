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
import jwtDecode from 'jwt-decode';
import ButtonBase from '@material-ui/core/ButtonBase';
import * as Yup from 'yup';
import { isJwtExpired } from 'jwt-check-expiration';

import { handleLogout } from '../../auth/actions/auth-actions';

import ApplicationHeader from '../../shared-components/header';

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
    paper2: {
      padding: theme.spacing(2),
      margin: 'auto',
      marginTop: "30px",
      width: 1000,
    },
    image: {
      width: 200,
      height: 200,
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
    },
    h2: {
      textAlign: 'center',
      margin: '20px auto',
      display: 'block'
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
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);

    const { name } = jwtDecode(user.token);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let desc = `${description}`
        dispatch(handlePostReview(name, value, desc, currentHotel._id));
        dispatch(handleGetReviews(currentHotel._id));
        history.push('/home');
    }

    const isTokenValid = isJwtExpired(user.token);
    if(isTokenValid) {    
      dispatch(handleLogout());
      history.push('/login');
    }
  return (
    <div className={classes.root}>
    <ApplicationHeader/>  

    <Paper className={classes.paper2}>
    <Grid container spacing={2}  >
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src='../../../../hotel-logo.jpg' />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography  variant="h1"> 
                
                </Typography>
                <Typography gutterBottom variant="h4">
                  {currentHotel.name} 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {currentHotel.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {currentHotel.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" >
                  Rating <Rating name="half-rating-read" defaultValue={currentHotel.rate} precision={0.5} readOnly />
                </Typography>

              </Grid>
              </Grid>
          </Grid>
      </Grid>
      </Paper>
      <Typography gutterBottom variant="h6" className={classes.h2}>
                  Recent reviews for hotel {currentHotel.name}
      </Typography>
      {reviews && reviews.slice(0).reverse().map((review) => {
      return <Paper className={classes.paper}>
        <Grid container direction="column" spacing={2}>
        <Grid container direction="row">
          <Grid item >
            <Avatar alt="Remy Sharp" src={imgLink} />
          </Grid>
          <Grid item>
          <h4 style={{ margin: "10px", textAlign: "left" }}>{review.author}</h4>
          </Grid>
          </Grid>
          <Grid justifyContent="left" item style={{ margin: "10px"}}>
            <p style={{ textAlign: "left" }}>
            {review.description}
            
            </p>
            <Rating name="half-rating-read" defaultValue={review && review.rating} readOnly />
            <br></br>
            <IconButton aria-label="like" className={classes.margin} >
              
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
          <TextField multiline fullWidth rows={4}  id="outlined-basic" label="Leave a review..." variant="outlined" value={description}
          onChange={e => setDescription(e.target.value)}/>    
          <Button type="submit" value="Submit" className={classes.button} variant="contained" color="primary"  >Submit </Button>
      </form>
      </Paper>
    </div>
  );
}
