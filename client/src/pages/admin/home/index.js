import React, { useState, useEffect } from 'react'
import Modal from '../home/modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





function home() {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productModule, setProductModule] = useState(false)

    const tableData = [
        {
            description: 'This is something desc 1',
            status: 'Active',
            date: 'July 12, 2023',
            id: 1,
        },
        {
            description: 'This is something desc 2',
            status: 'Inactive',
            date: 'July 15, 2023',
            id: 2,
        },
        // Add more data objects as needed
    ];


    useState(async () => {
        try {
            let token = localStorage.getItem("_token")
            console.log(token)

            const response = await fetch('http://127.0.0.1:3001/api/admin/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },

            });


            const responseData = await response.json();
            console.log(responseData)

            setCategories(responseData.data);





        } catch (error) {
            console.log(error)

        }

    }, [])


    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    //   
    const categorySchema = Yup.object().shape({

        categoryName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')

    });

    const categorySubmit = async (data) => {

        try {

            let token = localStorage.getItem('_token')
            let payload = {
                token: token,
                categoryName: data.categoryName
            }
            console.log(payload)
            const response = await fetch('http://127.0.0.1:3001/api/admin/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000)


                // we have jwt token in responseDate.token (split bearer form the token and store on localstorage)



            }



        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='main'>
            <div className='header'>


                <h3>.</h3>
                <h3>Elite Bazar</h3>
                <h3>user icon</h3>

            </div>
            <div className={`sidebar ${isOpen ? 'open' : ''} `}>
                <div className='toggleBtn' onClick={toggleSidebar}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
                <nav className='sideNav'>

                    <ul className='customUl'>
                        <li>Dashboard</li>
                        <li>Category</li>
                        <li>Product</li>
                        <li>Order</li>
                    </ul>
                </nav>
            </div>

            <div className='subHeading'>
                <div class="dashboard-card">
                    <div class="card-content">
                        <h2>Sales</h2>
                        <p>Total Sales: $5000</p>
                    </div>
                </div>
                <div class="dashboard-card">
                    <div class="card-content">
                        <h2>Order</h2>
                        <p>Total Order: 300</p>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-content">
                        <h2>Product</h2>
                        <p>Total Product: 100</p>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-content">
                        <h2>Category</h2>
                        <p>Total Category: 10</p>
                    </div>
                </div>
            </div>

            <div>
                
                <div className='categoryModule'>
                 

                    

                    <div className='btnPosition'>

                        <button onClick={handleOpenModal} className='addButton'>Add Category</button>

                    </div>

                    <div className='category'>
                        <div className='addCatagory'>

                        </div>
                        <div className='categoryTable'>
                            {categories.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Category Name</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (

                                            <tr key={category.id}>
                                                <td>{category.categoryName}</td>
                                                <td>
                                                    <button className={category.status === 'Active' ? 'btn btn-primary' : 'btn btn-inactive'}>
                                                        {category.status == false ? 'Inactive' : 'Active'}
                                                    </button>
                                                </td>
                                                <td>{category.updatedAt}</td>
                                                <td>
                                                    <button>E</button>
                                                    <button>D</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data to display.</p>
                            )}
                        </div>





                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <h1>Add Category</h1>

                            <Formik
                                initialValues={{
                                    categoryName: '',
                                }}
                                validationSchema={categorySchema}
                                onSubmit={categorySubmit}>
                                {({ errors, touched }) => (
                                    <Form>

                                        <Field type="text" placeholder="product category name" name="categoryName" />
                                        {errors.categoryName && touched.categoryName ? (
                                            <div>{errors.categoryName}</div>
                                        ) : null}

                                        <button type="submit">Add</button>
                                        <ToastContainer />

                                    </Form>
                                )}
                            </Formik>

                            <button onClick={handleCloseModal}>Close Modal</button>
                        </Modal>


                    </div>


                </div>






            </div>
        </div>

    )
}

export default home