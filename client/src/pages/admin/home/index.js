import React, { useState, useEffect } from 'react'
import Modal from '../home/modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





function home() {
    const [token, setToken] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryModule, setCategoryModule] = useState(false)
    const [productModule, setProductModule] = useState(true)
    const [orderModule, setOrderModule] = useState(false)
    const [dashboardModule, setDashboardModule] = useState(false)

    const selectCatogary = () => {
        console.log('category')
        setCategoryModule(true)

    }
    const selectProduct = () => {
        setCategoryModule(false)

        setProductModule(true)

    }




    useState(async () => {
        try {
            let token = localStorage.getItem("_token")
            console.log(token)

            setToken(token)

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
    const handleOpenModal = (type) => {

        if (type === 'category') {
            setIsCategoryModalOpen(true)
        }
        if (type === 'product') {

            setIsProductModalOpen(true)
        }

        console.log(type)
        setIsCategoryModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCategoryModalOpen(false);
        setIsProductModalOpen(false)
    };



    //   category schema
    const categorySchema = Yup.object().shape({

        categoryName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')

    });
    
    const productSchema = Yup.object().shape({

        productName: Yup.string()
            .required('Required'),
        productDescription: Yup.string()
            .required('Required'),
        productPrice: Yup.string()
            .required('Required'),
        productDiscountedPrice: Yup.string()
            .required('Required'),
        productCategory: Yup.string()
            .required('Required'),
        productQuantity: Yup.string()
            .required('Required'),

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
                    setIsCategoryModalOpen(false);
                }, 2000)

            }


        } catch (error) {
            console.log(error)

        }
    }

    const productSubmit = async(data)=>{
        try {
            
            const response = await fetch('http://127.0.0.1:3001/api/admin/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
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
                setTimeout(() => {
                    setIsProductModalOpen(false);
                }, 2000)

   

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
                        <li onClick={selectCatogary}>Category</li>
                        <li onClick={selectProduct}>Product</li>
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

                {
                    categoryModule ? (
                        <div className='categoryModule'>




                            <div className='btnPosition'>

                                <button onClick={() => handleOpenModal('category')} className='addButton'>Add Category</button>

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




                                {/* add category modal */}


                                <Modal isOpen={isCategoryModalOpen} onClose={handleCloseModal}>
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



                    ) : ("")

                }







            </div>


            <div >



                {
                    productModule ? (
                        <div className='productModule'>




                            <div className=''>

                                <button onClick={() => handleOpenModal('product')} className='addButton'>Add Product</button>

                            </div>

                            <div className='product'>
                                <div className='addProduct'>

                                </div>
                                <div className='productCategory'>
                                    {categories.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th> Description</th>
                                                    <th> Price</th>
                                                    <th> Discount Price</th>
                                                    <th> Category</th>
                                                    <th> Quantity</th>
                                                    <th>Status</th>
                                                    <th>Image</th>
                                                    <th>Action</th>

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







                            </div>


                        </div>



                    ) : ("")

                }

                <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
                    <h1>Add Product</h1>

                    <Formik
                        initialValues={{
                            productName: '',
                            productDescription: '',
                            productPrice: '',
                            productDiscountedPrice: '',
                            productCategory: '',
                            productQuantity: '',
                        
                        }}
                        validationSchema={productSchema}
                        onSubmit={productSubmit}>
                        {({ errors, touched }) => (
                            <Form>

                                <Field type="text" placeholder="product name" name="productName" />
                                {errors.productName && touched.productName ? (
                                    <div>{errors.productName}</div>
                                ) : null}
                                <Field type="text" placeholder="product description" name="productDescription" />
                                {errors.productDescription && touched.productDescription ? (
                                    <div>{errors.productDescription}</div>
                                ) : null}
                                <Field type="text" placeholder="product price" name="productPrice" />
                                {errors.productPrice && touched.productPrice ? (
                                    <div>{errors.productPrice}</div>
                                ) : null}
                                <Field type="text" placeholder="product discounted price" name="productDiscountedPrice" />
                                {errors.productDiscountedPrice && touched.productDiscountedPrice ? (
                                    <div>{errors.productDiscountedPrice}</div>
                                ) : null}
                                <Field type="text" placeholder="product category" name="productCategory" />
                                {errors.productCategory && touched.productCategory ? (
                                    <div>{errors.productCategory}</div>
                                ) : null}
                                <Field type="text" placeholder="product quantity" name="productQuantity" />
                                {errors.productQuantity && touched.productQuantity ? (
                                    <div>{errors.productQuantity}</div>
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

    )
}

export default home