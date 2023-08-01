import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required')

});

export const loginValidation = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        email: '',
        password:''
      }}
      validationSchema={LoginSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field placeholder="email" name="email" />
          {errors.email && touched.email ? (
            <div>{errors.email}</div>
          ) : null}
          <Field type="password" placeholder="password" name="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
 
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default loginValidation