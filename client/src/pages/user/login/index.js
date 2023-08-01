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

const loginSubmit = async(data)=>{
  try {
    
    const response = await fetch('http://127.0.0.1:3001/api/user/login',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(response)

    const responseData = await response.json();
    console.log(responseData)
    
  } catch (error) {
    console.log(error)
    
  }
}

export const loginValidation = () => (



  <div>
    <h1>User Login</h1>
    <Formik
      initialValues={{
        email: '',
        password:''
      }}
      validationSchema={LoginSchema}
      onSubmit= {loginSubmit }
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