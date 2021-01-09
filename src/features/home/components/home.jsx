import React, {useEffect, Button, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Divider, Avatar, colors} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { handleGetHotels, handleGetReviews, handleGetHotel } from '../actions/home-actions';
import color from '@material-ui/core/colors/amber';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';


import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";

import TextField from '@material-ui/core/TextField';

import Review from './reviews'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    
    display: 'block',

    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(5),
    margin: 'auto',
    width: 800,
  },
  paper2: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 600,
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
}));

export default function ComplexGrid() {
  const classes = useStyles();

  const hotels = useSelector(state => state.hotels.hotels);

  const reviews = useSelector(state => state.hotels.reviews);
  const history = useHistory();

  const imgLink = '../../../../user-logo.png'
  const dispatch = useDispatch();

  useEffect(() => { dispatch(handleGetHotels([], [
    {
        "type": "asc",
        "feature": "name",
        "priority": 1
    }], {
  }, history));
  }, [dispatch]);

  console.log(hotels, reviews)


  const [expandedId, setExpandedId] = React.useState(-1);


  const handleExpandClick = i => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const handleOnClick = id => {
    dispatch(handleGetReviews(id));
    dispatch(handleGetHotel(id));
    history.push('/review');
  }
 
  return (
    
    <div className={classes.root}>
    {hotels.data.map((data) => {
      return <Paper className={classes.paper}>
        <Grid container spacing={2}  >
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src='../../../../hotel-logo.jpg' />
            </ButtonBase>
         
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography  variant="h1"> 
                
                </Typography>
                <Typography gutterBottom variant="h4">
                  {data.name} 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {data.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {data.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" >
                  Rating <Rating name="half-rating-read" defaultValue={data.rate} precision={0.5} readOnly />
                </Typography>

              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }} >
                  
                <Link  onClick={() => handleOnClick(data._id)} variant="body2" >       
                  Reviews
                </Link>
                
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
            <IconButton aria-label="like" className={classes.margin}>
          <ThumbUpIcon /> </IconButton>
          <IconButton aria-label="unlike" className={classes.margin}>
          <ThumbDownIcon /> </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

        <CardActions disableSpacing>
        <IconButton
              onClick={() => handleExpandClick(1)}
              aria-expanded={expandedId === 1}
              aria-label="show more"
            >
             Reviews <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expandedId === 1} timeout="auto" unmountOnExit>
            <CardContent>
            {reviews.map((review) => {
            return <Paper className={classes.paper2}>
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

            </Grid>
            <Grid justifyContent="left" right>
          <IconButton aria-label="like" className={classes.margin} > 
          <ThumbUpIcon /> </IconButton>
          <IconButton aria-label="unlike" className={classes.margin}>
          <ThumbDownIcon /> </IconButton>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
            })}

       <Paper className={classes.paper2}>
            <form>
          <TextField multiline fullWidth rows={4}  id="outlined-basic" label="Leave review..." variant="outlined" />
          
          </form>
      </Paper>
            </CardContent>
          </Collapse>
      </Paper>
    })}
    </div>
  );
}
