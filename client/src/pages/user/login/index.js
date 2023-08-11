import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {setUserDetails} from '../../redux/reducerSlices/userSlice'
import { Link } from 'react-router-dom';



import {useDispatch, useSelector} from "react-redux";



export const userLogin = () => {

 const {isLoggedIn} = useSelector(state => state.user)


  const  dispatch = useDispatch()
  

  useEffect(()=>{
    console.log(isLoggedIn)
  })





  const router = useRouter();

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
         // if error then show error on toast and throw error message
  
         if (responseData.Code == 0) {
          toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
  
      }
      // if success then show success on toast and throw success message
      if (responseData.Code == 1) {
        console.log(responseData)
        dispatch(setUserDetails(responseData))
  
          toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
      
      // we have jwt token in responseDate.token (split bearer form the token and store on localstorage)
  

      // const token = responseData.token.split(' ')[1]
      // localStorage.setItem('authToken',token)
  
      // router.push('/');
  
  
      }
  
      
    } catch (error) {
      console.log(error)
      
    }
  }



return(

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
          <ToastContainer />

        </Form>
      )}
    </Formik>
  </div>
);
}
export default userLogin