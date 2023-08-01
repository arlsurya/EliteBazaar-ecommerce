import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    mobile: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const registerAdmin = () => (
    <div>
        <h1>Admin Register</h1>
        <Formik
            initialValues={{
                fullName: '',
                email: '',
                mobile: '',
                password: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
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

                    <Field placeholder="password" name="password" />
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default registerAdmin;
