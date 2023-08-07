import React, { useState, useEffect } from 'react'
import Modal from '../home/modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Divider from '@mui/material/Divider';

import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function home() {

    // route
    const router = useRouter();

    // api url
    const apiURL = process.env.API_BASE_URL

    // get token from the localstorage
    const [token, setToken] = useState('')
    // left sidebar
    const [isOpen, setIsOpen] = useState(false)

    // category modal
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    // product modal
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    // data from the backend
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState([])
    const [productCount, setProductCount] = useState([])
    const [categoryCount, setCategoryCount] = useState([])
    // left side bar modules
    const [categoryModule, setCategoryModule] = useState(false)
    const [sales, setSales] = useState('')
    const [productModule, setProductModule] = useState(true)
    const [orderModule, setOrderModule] = useState(false)
    const [dashboardModule, setDashboardModule] = useState(false)

    // category dynamic initial value
    const [initialCategoryName, setInitialCategoryName] = useState('')
    // get update category id
    const [updateCategoryId, setUpdateCategoryId] = useState('')

    // this is for dynamic name for modal like (add category or edit category)
    const [categoryActionType, setCategoryActionType] = useState('')
    // product dynamic initial value
    const [initialProductName, setInitialProductName] = useState('')
    const [initialProductDescription, setInitialProductDescription] = useState('')
    const [initialProductPrice, setInitialProductPrice] = useState('')
    const [initialProductDiscountedPrice, setInitialProductDiscountedPrice] = useState('')
    const [initialProductCategory, setInitialProductCategory] = useState('')
    const [initialProductQuantity, setInitialProductQuantity] = useState('')
    // get update profile id
    const [updateProductId, setUpdateProductId] = useState('')

    // this is for dynamic name for modal like (add product or edit product)
    const [productActionType, setProductActionType] = useState('')


    // left sidebar modules
    // category module
    const selectCatogary = () => {
        setDashboardModule(false);
        setCategoryModule(true);
        setProductModule(false);
        setOrderModule(false);
    }
    // product module
    const selectProduct = () => {
        setDashboardModule(false);
        setCategoryModule(false);
        setProductModule(true);
        setOrderModule(false);

    }
    // order module
    const selectOrder = () => {
        setDashboardModule(false);
        setCategoryModule(false);
        setProductModule(false);
        setOrderModule(true);

    }



    useEffect(() => {
        // get token from the localstorage and set the token to state
        tokenExe()
        getProducts()
        getOrders()
        getCategory()

    }, [])

    const tokenExe = () => {
        let getToken = localStorage.getItem('_token')
        if (getToken != null) {
            setToken(getToken)
            console.log(getToken)
        } else {
            router.push('/admin/login')
        }

    }

    const getProducts = async () => {
        try {
            let getToken = localStorage.getItem(process.env.localStorage.token)
            const response = await fetch(`${apiURL}/api/admin/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken}`
                },
            });
            const responseData = await response.json();
            setProducts(responseData.data);
            setProductCount(responseData.productCount)
            console.log(responseData)
        } catch (error) {
            console.log(error)
        }
    }

    const getOrders = async () => {
        let getToken = localStorage.getItem(process.env.localStorage.token)
        const response = await fetch(`${apiURL}/api/admin/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getToken}`
            },
        });
        const responseData = await response.json();
        console.log(responseData)
        setOrders(responseData.data);
        setSales(responseData.sales);
        setOrderCount(responseData.orderCount)
    }

    const getCategory = async () => {
        try {
            let getToken = localStorage.getItem(process.env.localStorage.token)
            const response = await fetch(`${apiURL}/api/admin/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken}`
                },
            });
            const responseData = await response.json();
            console.log(responseData)
            setCategories(responseData.data);
            setCategoryCount(responseData.countCategory)
        } catch (error) {
            console.log(error)

        }
    }

    // add category method
    const addCategory = async (data) => {
        try {
            let token = localStorage.getItem(process.env.localStorage.token)
            let payload = {
                token: token,
                categoryName: data.categoryName
            }
            console.log(payload)
            const response = await fetch(`${apiURL}/api/admin/addcategory`, {
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

                setIsCategoryModalOpen(false);

            }

            getCategory()

        } catch (error) {
            console.log(error)
        }
    }

    // add product
    const addProduct = async (data) => {
        try {
            const response = await fetch(`${apiURL}/api/admin/addproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log(responseData)

            // if error then show error on toast and throw error message
            if (responseData.Code == 0) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })

            }
            // if success then show success on toast and throw success message
            if (responseData.Code == 1) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
                setIsProductModalOpen(false);
            }
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen)

    }

    const handleOpenModal = (type) => {
        if (type === 'category') {
            setCategoryActionType('Add')
            setIsCategoryModalOpen(true)
        }
        if (type === 'product') {
            setProductActionType('Add')
            setIsProductModalOpen(true)
        }
    };

    const handleCloseModal = () => {

        setIsCategoryModalOpen(false);
        setIsProductModalOpen(false)
        // reset the product initial value 

        setInitialProductName('')
        setInitialProductDescription('')
        setInitialProductPrice('')
        setInitialProductDiscountedPrice('')
        setInitialProductCategory('')
        setInitialProductQuantity('')

        // reset the category initial value 
        setInitialCategoryName('')
        setCategoryActionType('')
    };


    // category schema
    const categorySchema = Yup.object().shape({
        categoryName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    });

    // product schema
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


    const updateExistCategory = async (data) => {
        console.log(data)

        try {
            const response = await fetch(`${apiURL}/api/admin/editcategory`, {
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
                setIsCategoryModalOpen(false);

            }
            getCategory()
        } catch (error) {
            console.log(error)
        }

    }


    const categorySubmit = async (data) => {

        if (categoryActionType == 'Add') {
            addCategory(data)

        } if (categoryActionType == 'Update') { //update exist category

            let payload = {
                id: updateCategoryId,
                categoryName: data.categoryName
            }
            updateExistCategory(payload)
        }

    }


    const updateExistProduct = async (data) => {
        try {
            let token = localStorage.getItem('_token')
            const response = await fetch(`${apiURL}/api/admin/updateproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log(responseData)
            // if error then show error on toast and throw error message

            if (responseData.Code == 0) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
            }
            // if success then show success on toast and throw success message
            if (responseData.Code == 1) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
                setIsProductModalOpen(false);
            }

            getProducts()

        } catch (error) {
            console.log(error)
        }


    }

    const productSubmit = async (data) => {
        console.log(productActionType)
        if (productActionType == "Add") {
            addProduct(data)
        }
        if (productActionType == 'Update') {
            console.log(updateProductId)
            // adding id field to data
            data.id = updateProductId
            console.log(data)
            updateExistProduct(data)
        }

    }

    const editCategory = (data) => {
        setCategoryActionType('Update')
        setUpdateCategoryId(data._id)
        console.log(data)
        setIsCategoryModalOpen(true)
        setInitialCategoryName(data.categoryName)


    }

    const editProduct = (data) => {
        console.log(data)
        setUpdateProductId(data._id)
        setInitialProductName(data.productName)
        setInitialProductDescription(data.productDescription)
        setInitialProductPrice(data.productPrice)
        setInitialProductDiscountedPrice(data.productDiscountedPrice)
        setInitialProductCategory(data.productCategory)
        setInitialProductQuantity(data.productQuantity)
        setProductActionType('Update')
        setIsProductModalOpen(true)

    }


    const deleteProduct = async (id) => {
        try {
            let payload = {
                productId: id
            }
            const response = await fetch(`${apiURL}/api/admin/deleteproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData)

            if (responseData.Code == 0) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
            }
            // if success then show success on toast and throw success message
            if (responseData.Code == 1) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            }

            getProducts()

        } catch (error) {
            console.log(error)

        }


    }
    const deleteCategory = async (id) => {
        try {
            let payload = {
                categoryId: id
            }
            const response = await fetch(`${apiURL}/api/admin/deletecategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData)

            if (responseData.Code == 0) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'error' })
            }
            // if success then show success on toast and throw success message
            if (responseData.Code == 1) {
                toast(responseData.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            }

            getCategory()

        } catch (error) {
            console.log(error)

        }


    }

    const edit = (type, data) => {
        if (type === 'category') {
            editCategory(data)
        }
        if (type === 'product') {

            editProduct(data)
        }

    }
    const deleteMethod = (type, id) => {

        if (type === 'category') {

            deleteCategory(id)
        }
        if (type === 'product') {
            deleteProduct(id)
        }

    }

    const createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    return (
        <div className='m-0 p-0'>
            <div className='flex justify-between bg-gray-200 h-10 align-center pb-2 pt-2'>


                <IconButton onClick={toggleSidebar}>
                    <HiOutlineChevronDoubleRight />
                </IconButton>



                <h3 >Elite Bazar</h3>
                <h3 className='pr-3'>user icon</h3>


            </div>

            <div className='flex'>

                <div
                    className={`sidebar ${isOpen ? 'left-0' : '-left-250'} transition-left duration-300 ease-in-out bg-gray-900 text-white h-screen w-60 p-5`}
                >
                    <div className="toggleBtn" onClick={toggleSidebar}>
                        <div className={`bar ${isOpen ? 'rotate-45 translate-x-[-4px] translate-y-[4px]' : ''}`} />
                        <div className={`bar ${isOpen ? 'opacity-0' : ''}`} />
                        <div className={`bar ${isOpen ? 'rotate-[-45deg] translate-x-[-4px] translate-y-[-4px]' : ''}`} />
                    </div>
                    <nav className="sideNav">
                        <ul className="customUl">
                            <li className='p-10 cursor-pointer  text-center'>Dashboard</li>
                            <li className='p-10 cursor-pointer text-center' onClick={selectCatogary}>Category</li>
                            <li className='p-10 cursor-pointer text-center ' onClick={selectProduct}>Product</li>
                            <li className='p-10 cursor-pointer text-center' onClick={selectOrder}>Order</li>
                        </ul>
                    </nav>

                </div>
                <div className='h-8 w-16 vh-100 w-full p-5  '>
                    <div className='flex justify-between'>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="card-content">
                                <h2>Sales</h2>

                                <h1 className='text-gray-400 text-lg'>Total Sales: {sales.length > 0 ? sales[0].totalSalesAmount : ''}</h1>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="card-content">
                                <h2>Order</h2>
                                <p className='text-gray-400 text-lg'>Total Orders: {orderCount ? orderCount : 0}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="card-content">
                                <h2>Product</h2>
                                <p className='text-gray-400 text-lg'>Total Products: {productCount ? productCount : 0}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="card-content">
                                <h2>Category</h2>
                                <p className='text-gray-400 text-lg'>Total Categorys: {categoryCount ? categoryCount : 0}</p>
                            </div>
                        </div>
                    </div>

                    <Divider className='mt-5' light />
{
    productModule ? (

        <TableContainer>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Discount Price</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

               
                    {products.map((product)=>{
                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        
                    <TableCell component="th" scope="row">
                    {product.productName}
                    </TableCell>
                    <TableCell align="right">{product.productName}</TableCell>
                    <TableCell align="right">skdfjlk</TableCell>
                    <TableCell align="right">skdfjlk</TableCell>
                    <TableCell align="right">skdfjlk</TableCell>



                </TableRow>
                    })}
             

            </TableBody>
        </Table>
    </TableContainer>


    ) : ''
}
                  



                </div>
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
                        <li onClick={selectOrder} >Order</li>
                    </ul>
                </nav>
            </div>

            <div className='subHeading'>
                <div className="dashboard-card">
                    <div className="card-content">
                        <h2>Sales</h2>

                        <h1 className='text-gray-400 text-lg'>Total Sales: {sales.length > 0 ? sales[0].totalSalesAmount : ''}</h1>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="card-content">
                        <h2>Order</h2>
                        <p>Total Order: {orderCount ? orderCount : 0}</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-content">
                        <h2>Product</h2>
                        <p>Total Product: {productCount ? productCount : 0}</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-content">
                        <h2>Category</h2>
                        <p>Total Category: {categoryCount ? categoryCount : 0}</p>
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
                                                            <button onClick={() => edit('category', category)} >E</button>
                                                            <button onClick={() => deleteMethod('category', category._id)}  >D</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No data to display.</p>
                                    )}
                                    <ToastContainer />

                                </div>




                                {/* add category modal */}


                                <Modal isOpen={isCategoryModalOpen} onClose={handleCloseModal}>
                                    <h1>{categoryActionType} Category</h1>

                                    <Formik
                                        initialValues={{
                                            categoryName: initialCategoryName,
                                        }}
                                        validationSchema={categorySchema}
                                        onSubmit={categorySubmit}>
                                        {({ errors, touched }) => (
                                            <Form>

                                                <Field type="text" placeholder="product category name" name="categoryName" />
                                                {errors.categoryName && touched.categoryName ? (
                                                    <div>{errors.categoryName}</div>
                                                ) : null}

                                                <button type="submit">{categoryActionType}</button>

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
                                                {products.map((product) => (

                                                    <tr key={product.id}>
                                                        <td>{product.productName}</td>
                                                        <td>{product.productDescription}</td>
                                                        <td>{product.productPrice}</td>
                                                        <td>{product.productDiscountedPrice}</td>
                                                        <td>{product.productCategory}</td>
                                                        <td>{product.productQuantity}</td>
                                                        <td>
                                                            <button className={product.status === 'Active' ? 'btn btn-primary' : 'btn btn-inactive'}>
                                                                {product.status == false ? 'Inactive' : 'Active'}
                                                            </button>
                                                        </td>
                                                        <td>img</td>
                                                        <td>
                                                            <button onClick={() => edit('product', product)}>E</button>
                                                            <button onClick={() => deleteMethod('product', product._id)} >D</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No data to display.</p>
                                    )}

                                    <ToastContainer />

                                </div>







                            </div>


                        </div>



                    ) : ("")

                }

                <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
                    <h1>{productActionType} Product</h1>

                    <Formik
                        initialValues={{
                            productName: initialProductName,
                            productDescription: initialProductDescription,
                            productPrice: initialProductPrice,
                            productDiscountedPrice: initialProductDiscountedPrice,
                            productCategory: initialProductCategory,
                            productQuantity: initialProductQuantity,

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

                                <button type="submit">{productActionType}</button>
                                <ToastContainer />

                            </Form>
                        )}
                    </Formik>

                    <button onClick={handleCloseModal}>Close Modal</button>
                </Modal>

            </div>

            <div className='orderModule'>
                {
                    orderModule ? (

                        <div className='orders'>
                            {orders.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User Name</th>
                                            <th>User Mobile</th>
                                            <th>User Email</th>
                                            <th> Product Name</th>
                                            <th> Product Amount</th>
                                            <th> Product Quantity</th>
                                            <th> Transaction Amount</th>
                                            <th> Transaction ID</th>
                                            <th> Payment Gateway</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (

                                            <tr key={order.id}>
                                                <td>{order.userDetails.fullName}</td>
                                                <td>{order.userDetails.mobile}</td>
                                                <td>{order.userDetails.email}</td>
                                                <td>{order.productName}</td>
                                                <td>{order.productAmount}</td>
                                                <td>{order.productQuantity}</td>
                                                <td>{order.transactionAmount}</td>
                                                <td>{order.transactionId}</td>
                                                <td>{order.paymentGateway}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data to display.</p>
                            )}
                        </div>


                    ) : ('')
                }

            </div>
        </div>

    )
}

export default home