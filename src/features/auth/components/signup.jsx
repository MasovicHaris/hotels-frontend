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

import { handleSignup } from '../actions/auth-actions';

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

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const signupInProgress = useSelector(state => state.auth.signupInProgress);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('First name is required.'),
    surname: Yup.string().required('Last name is reqduired.'),
    email: Yup.string()
      .required('Email is required.')
      .min(5, 'Email should have at least 5 characters.'),
    password: Yup.string().required('Password is required.'),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(handleSignup(values, history));
    },
  });

  if (userLoggedIn) {
    return <Redirect to="/" />;
  }

  const fields = [
    { value: values.name, label: 'First name', error: touched.name && errors.name, name: 'name', grid: true },
    { value: values.surname, label: 'Last name', error: touched.surname && errors.surname, name: 'surname', grid: true },
    { value: values.email, label: 'Email', error: touched.email && errors.email, name: 'email' },
    { value: values.password, label: 'Password', error: touched.password && errors.password, name: 'password', password: true },
  ];

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <h1>e4u hotels - Signup</h1>
            <Grid container spacing={2}>
              {fields.map(field => (
                <Grid key={field.name} item xs={12} sm={field.grid ? 6 : null}>
                  <TextField
                    value={field.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={field.label}
                    error={Boolean(field.error)}
                    helperText={field.error}
                    variant="outlined"
                    name={field.name}
                    fullWidth
                    type={field.password ? 'password' : 'text'}
                  />
                </Grid>
              ))}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" loadingInProgress={signupInProgress} className={classes.submit}>
              {'Sign up'}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Already have an account?'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Fragment>
  );
}

export default SignUp;
