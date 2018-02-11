import React from 'react';
import { Formik } from 'formik';

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

export const AwesomeForm = () => (
  <Formik
    initialValues={{
      name: 'Malcolm Kee',
      email: '',
      age: ''
    }}
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = 'Required';
      }

      if (!values.age) {
        errors.age = 'Required';
      } else if (values.age < 18) {
        errors.age = `You're underage!`;
      }

      return errors;
    }}
    onSubmit={values => {
      console.log('values:', values);
    }}
    render={({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="awesome-form--name">Name</InputLabel>
          <Input
            id="awesome-form--name"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.name && errors.name ? (
            <FormHelperText error>{errors.name}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="awesome-form--email">Email</InputLabel>
          <Input
            id="awesome-form--email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email ? (
            <FormHelperText error>{errors.email}</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="awesome-form--age">Age</InputLabel>
          <Input
            id="awesome-form--age"
            type="number"
            name="age"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.age}
          />
          {touched.age && errors.age ? (
            <FormHelperText error>{errors.age}</FormHelperText>
          ) : null}
        </FormControl>
        <Button color="primary" type="submit" raised>
          Submit
        </Button>
      </form>
    )}
  />
);
