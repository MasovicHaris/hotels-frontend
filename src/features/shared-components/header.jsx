import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import propTypes from 'prop-types';
import { isJwtExpired } from 'jwt-check-expiration';


import { handleLogout } from '../auth/actions/auth-actions';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  root: {
    maxHeight: '64px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '56px',
    },
  },
  toolbar: {
    justifyContent: 'space-between',
    backgroundColor: '#2e4a6b',
  },
  menuItem: {
    padding: theme.spacing(0, 0, 0, 0),
    display: 'flex',
  },
}));

function ApplicationHeader({ isCreateHotel }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const userIsAdmin = useSelector(state => state.auth.user.type === 'Admin');
  const user = useSelector(state => state.auth.user);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHotelsClicked = () => {
    setAnchorEl(null);
    history.push('/home');
  };

  const handleLogoutClicked = () => {
    setAnchorEl(null);
    history.push('/login');
    dispatch(handleLogout());
  };

  const handleCreateHotelClicked = () => {
    setAnchorEl(null);
    history.push('/new-hotel');
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleHotelsClicked}>Hotels</MenuItem>
      {userIsAdmin ? <MenuItem onClick={handleCreateHotelClicked}>Create hotel</MenuItem> : ''}
      <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" style={{ cursor: 'pointer' }} onClick={handleHotelsClicked}>
              Hotels
            </Typography>
          {userLoggedIn ? (
            <Fragment>
              <div className={classes.sectionDesktop}>
                <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                  <MenuIcon />
                </IconButton>
              </div>
            </Fragment>
          ) : ''}
        </Toolbar>
      </AppBar>
      {userLoggedIn && (
        <Fragment>
          {renderMenu}
        </Fragment>
      )}

    </div>
  );
}

ApplicationHeader.propTypes = {
  onSearch: propTypes.func,
  isMyAccount: propTypes.bool,
  isAuthPage: propTypes.bool,
};

ApplicationHeader.defaultProps = {
  onSearch: () => {},
  isMyAccount: false,
  isAuthPage: false,
};

export default ApplicationHeader;
