import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';




export const registrationValidation = () => {
  const router = useRouter();

  const registerSubmit = async (data) => {
    try {

      const response = await fetch('http://127.0.0.1:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(response)

      const responseData = await response.json();
      console.log(responseData)
      // if error then show error on toast and throw error message

      if (responseData.Code == 0) {
        toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })

      }
      // if success then show success on toast and throw success message
      if (responseData.Code == 1) {
        toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })

        // we have jwt token in responseDate.token (split bearer form the token and store on localstorage)

        const token = responseData.token.split(' ')[1]
        localStorage.setItem('authToken', token)

        router.push('/');


      }


    } catch (error) {
      console.log(error)

    }
  }


  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    mobile: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(2, 'Too Short!')
      // .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    rePassword: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),


  });


  return (
    <div>
      <h1>User Register</h1>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          mobile: '',
          password: '',
          rePassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={registerSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field placeholder="full name" name="fullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <Field placeholder="mobile" name="mobile" />
            {errors.mobile && touched.mobile ? (
              <div>{errors.mobile}</div>
            ) : null}

            <Field placeholder="email" name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field type="password" placeholder="password" name="password" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <Field type="password" placeholder="re enter password" name="rePassword" />
            {errors.rePassword && touched.rePassword ? <div>{errors.rePassword}</div> : null}
            <button type="submit">Submit</button>
            <ToastContainer />


          </Form>
        )}
      </Formik>
    </div>
  );
}


export default registrationValidation