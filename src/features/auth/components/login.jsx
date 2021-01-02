import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialContainer from '@material-ui/core/Container';
import styled from 'styled-components';
import * as Yup from 'yup';

import { handleLogin } from '../actions/auth-actions';

import Button from '../../shared-components/button';

const Container = styled(MaterialContainer)`
  background-color: #fff;
`;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const loginInProgress = useSelector(state => state.auth.loginInProgress);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.'),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(handleLogin(email, password, history));
    },
  });

  const emailError = touched.email && errors.email;
  const passwordError = touched.password && errors.password;

  if (userLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <h1>e4u hotels - Login</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={'Email'}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  variant="outlined"
                  name="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  name="password"
                  label={'Password'}
                  type="password"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" loadingInProgress={loginInProgress} className={classes.submit}>
              {'Sign in'}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Fragment>
  );
}

export default Login;
