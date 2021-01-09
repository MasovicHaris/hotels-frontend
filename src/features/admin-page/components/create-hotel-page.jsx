import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MaterialContainer from '@material-ui/core/Container';
import styled from 'styled-components';
import * as Yup from 'yup';

import { handleCreateHotel } from '../actions/admin-page-actions';

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
    width: '70%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateHotelPage() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const loginInProgress = useSelector(state => state.auth.loginInProgress);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required.'),
        address: Yup.string().required('Address is required.'),
        description: Yup.string().required('Description is required')
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
          name: '',
          address: '',
          description: ''
        },
        validationSchema,
        onSubmit: ({ name, address, description }) => {
          dispatch(handleCreateHotel(name, address, description));
        },
    });

    const nameError = touched.name && errors.name;
    const addressError = touched.address && errors.address;
    const descriptionError = touched.description && errors.description;

    return(
        <Fragment>
            <Container component="main">
                <div className={classes.paper}>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <h1>Create hotel</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label={'Name'}
                                error={Boolean(nameError)}
                                helperText={nameError}
                                variant="outlined"
                                name="name"
                                fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(addressError)}
                                helperText={addressError}
                                name="address"
                                label={'Address'}
                                variant="outlined"
                                fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(descriptionError)}
                                helperText={descriptionError}
                                name="description"
                                label={'Description'}
                                variant="outlined"
                                fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" loadingInProgress={loginInProgress} className={classes.submit}>
                            {'Create hotel'}
                        </Button>
                    </form>
                </div>
            </Container>
        </Fragment>
    )
}

export default CreateHotelPage;