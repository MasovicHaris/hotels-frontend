import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider, Avatar} from "@material-ui/core";

import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { handleGetHotels, handleGetReviews, handleGetHotel } from '../actions/home-actions';
import { handleDeleteHotel, handleEditClicked } from '../../admin-page/actions/admin-page-actions';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';


import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ApplicationHeader from '../../shared-components/header';
import Button from '@material-ui/core/Button';
import { isJwtExpired } from 'jwt-check-expiration';

import { handleLogout } from '../../auth/actions/auth-actions';

import TextField from '@material-ui/core/TextField';

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
    marginTop: '50px'
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
  edit: {
    marginRight: '10px'
  }
}));

export default function ComplexGrid() {
  const classes = useStyles();

  const hotels = useSelector(state => state.hotels.hotels);

  const reviews = useSelector(state => state.hotels.reviews);
  const history = useHistory();

  const userIsAdmin = useSelector(state => state.auth.user.type === 'Admin');

  const imgLink = '../../../../user-logo.png'
  const user = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => { dispatch(handleGetHotels([], [
    {
        "type": "asc",
        "feature": "name",
        "priority": 1
    }], {
  }, history));
  }, [dispatch]);



  const handleOnClick = id => {
    dispatch(handleGetReviews(id));
    dispatch(handleGetHotel(id));
    history.push('/review');
  }

  const handleEditHotel = (id) => {
    dispatch(handleGetHotel(id));
    dispatch(handleEditClicked());
    history.push('/hotel');
  }

  const isTokenValid = isJwtExpired(user.token);
  if(isTokenValid) {    
    dispatch(handleLogout());
    history.push('/login');
  }
 
 
  return (
    
    <div className={classes.root}>
      <ApplicationHeader/>
    {hotels.data.map((data) => {
      return <Paper className={classes.paper}>
        { userIsAdmin && <div>
          <Button variant="outlined" color="primary" className={classes.edit} onClick={() => handleEditHotel(data._id)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => {dispatch(handleDeleteHotel(data._id)); window.location.reload();}}>
            Delete
          </Button>
        </div> }
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
        </Paper>
    })}
    </div>
  );
}
