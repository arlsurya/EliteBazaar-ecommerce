import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';




export const adminLogin = () => {
  const router = useRouter();

  const LoginSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')

  });

  const loginSubmit = async (data) => {
    try {

      const response = await fetch('http://127.0.0.1:3001/api/admin/login', {
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
        localStorage.setItem('_token', token)

        router.push('/admin/home');


      }


    } catch (error) {
      console.log(error)

    }
  }



  return (



    <div>
      <div className=' bg-gradient-to-t from-cyan-500 to-blue-500 h-screen flex justify-center items-center'>
        <div className='w-4/5 rounded-xl bg-gray-100  py-8 xl:w-1/4'>
          <div className='flex flex-col  gap-4'>
            <h3 className='uppercase text-center text-xl font-semibold tracking-wider'>Admin Login</h3>

            <div className='pt-4 flex ml-7 flex-col gap-4  w-4/5'>

              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={loginSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                      <label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							></label>

                     <Field className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none" placeholder="email" name="email" />
                    {errors.email && touched.email ? (
                      <div className="text-red-500">{errors.email}</div>
                    ) : null}
                       <label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900 mt-5"
							>
								Password
							</label>
                    <Field className="block mt-2  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none" type="password" placeholder="password" name="password" />
                    {errors.password && touched.password ? (
                      <div className="text-red-500">{errors.password}</div>
                    ) : null}


                      <div className='flex justify-center'>

                    <button className="flex mt-6 w-full justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-indigo-800" type="submit">Login</button>

                      </div>
                    <ToastContainer />


                  </Form>
                )}
              </Formik>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
}
export default adminLogin