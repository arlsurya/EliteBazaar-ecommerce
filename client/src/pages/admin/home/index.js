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
import EditIcon from '@mui/icons-material/Edit';
import { BsSortUp, BsSearch, BsSortDown } from 'react-icons/bs';
import { MdEdit, MdDelete } from "react-icons/md";

import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import IconButton from '@mui/material/IconButton';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import {Modal} from '../../../components/modal'

const home = () => {

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

    const [selectedImage, setSelectedImage] = useState('')
    const [imageData, setImageData] = useState('')


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
        // tokenExe()
        getProducts()
        getOrders()
        getCategory()

    }, [])

    const imageSelected = (event) => {

        const selectedFile = event[0];
        setImageData(selectedFile)

        const readImage = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
                reader.readAsDataURL(file);
            });
        };

        readImage(selectedFile)
            .then((dataUrl) => {
                setSelectedImage(dataUrl);
                console.log(dataUrl);
            })
            .catch((error) => {
                console.error('Error reading image:', error);
            });
    };


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

        console.log(data)

        var formData = new FormData()

        Object.entries(data).map((item)=>{
            formData.append(item[0],item[1])
            
        })
        formData.append('productImage',imageData)
       

        try {
            const response = await fetch(`${apiURL}/api/admin/addproduct`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjQwOGJlZjZmY2I0MmY1ZThkMmRiMyIsImlhdCI6MTY5MjQ5OTEzMCwiZXhwIjoxNjkzMTAzOTMwfQ.yrmlXiHXQMWhVZWHkda_iVvXvgy8aCK3MxjDZ_dxFgM`
                },
                // body: JSON.stringify(formData),
                body: formData,
            });
            const responseData = await response.json();
            console.log(responseData)
            console.log(responseData.Code)

       

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
                    <div className='flex justify-between '>
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

                    <Divider className='p-3' light />





                    <Divider className='mt-5' light />

                    {
                        productModule ? (
                            <div className='productModule '>
                                <div className='btnPosition'>

                                    <button onClick={() => handleOpenModal('product')} className='addButton p-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'>Add Product</button>

                                </div>






                                <TableContainer className='mt-3 max-h-[500px] overflow-y-auto '>
                                    <Table aria-label="simple table">
                                        <TableHead className='font-bold bg-gray-100 text-center'>
                                            <TableRow >
                                                <TableCell align="center">Product Name</TableCell>
                                                <TableCell align="center">Description</TableCell>
                                                <TableCell align="center">Price</TableCell>
                                                <TableCell align="center">Discount Price</TableCell>
                                                <TableCell align="center">Category</TableCell>
                                                <TableCell align="center">Quantity</TableCell>
                                                <TableCell align="center">Status</TableCell>
                                                <TableCell align="center">Image</TableCell>
                                                <TableCell align="center">Edit</TableCell>
                                                <TableCell align="center">Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow className='text-center' key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell align="center">
                                                        {product.productName}
                                                    </TableCell>
                                                    <TableCell align="center">{product.productDescription}</TableCell>
                                                    <TableCell align="center">{product.productPrice}</TableCell>
                                                    <TableCell align="center">{product.productDiscountedPrice}</TableCell>
                                                    <TableCell align="center">{product.productCategory}</TableCell>
                                                    <TableCell align="center">{product.productQuantity}</TableCell>
                                                    <TableCell align="center"><button className={product.status === 'Active' ? 'btn btn-primary' : 'btn btn-inactive'}>
                                                        {product.status == false ? 'Inactive' : 'Active'}
                                                    </button></TableCell>
                                                    <TableCell align="center"><img src={`http://127.0.0.1:3001/api/uploads/${product.productImage}`} className='h-20 w-20 bg-black'></img></TableCell>
                                                    <TableCell align="center"><button onClick={() => edit('product', product)}> <IconButton > <MdEdit /></IconButton></button></TableCell>
                                                    <TableCell align="center"><button onClick={() => deleteMethod('product', product._id)} ><IconButton><MdDelete /></IconButton></button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>





                                    </Table>
                                </TableContainer>

                                {/* add product modal */}




                                <Modal className="fixed inset-0 flex items-center justify-center" isOpen={isProductModalOpen} onClose={handleCloseModal}>
                                    <div className='bg-white w-96 p-6 rounded-lg'>

                                        <h1 className='text-2xl font-bold mb-4'>{productActionType} Product</h1>

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

                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product name" name="productName" />
                                                    {errors.productName && touched.productName ? (
                                                        <div className='text-red-500'>{errors.productName}</div>
                                                    ) : null}
                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product description" name="productDescription" />
                                                    {errors.productDescription && touched.productDescription ? (
                                                        <div className='text-red-500'>{errors.productDescription}</div>
                                                    ) : null}
                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product price" name="productPrice" />
                                                    {errors.productPrice && touched.productPrice ? (
                                                        <div className='text-red-500'>{errors.productPrice}</div>
                                                    ) : null}
                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product discounted price" name="productDiscountedPrice" />
                                                    {errors.productDiscountedPrice && touched.productDiscountedPrice ? (
                                                        <div className='text-red-500'>{errors.productDiscountedPrice}</div>
                                                    ) : null}
                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product category" name="productCategory" />
                                                    {errors.productCategory && touched.productCategory ? (
                                                        <div className='text-red-500'>{errors.productCategory}</div>
                                                    ) : null}
                                                    <Field type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mt-2" placeholder="product quantity" name="productQuantity" />
                                                    {errors.productQuantity && touched.productQuantity ? (
                                                        <div className='text-red-500'>{errors.productQuantity}</div>
                                                    ) : null}

                                                    <div className='mt-3'>
                                                        <input onChange={(e) => imageSelected(e.target.files)} type='file' />

                                                        <div className='h-100 w-150 mt-3 '>
                                                            <img className='rounded-md' src={selectedImage}></img>
                                                        </div>

                                                    </div>

                                                    <div className='flex justify-between'>

                                                        <button className='mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md' onClick={handleCloseModal}>Close</button>
                                                        <button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md' type="submit">{productActionType}</button>

                                                    </div>
                                                    <ToastContainer />

                                                </Form>
                                            )}
                                        </Formik>


                                    </div>
                                </Modal>


                            </div>



                        ) : ''
                    }
                    {
                        orderModule ? (

                            <div className='orders'>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">User Name</TableCell>
                                                <TableCell align="right">User Mobile</TableCell>
                                                <TableCell align="right">User Email</TableCell>
                                                <TableCell align="right">Product Name</TableCell>
                                                <TableCell align="right">Product Amount</TableCell>
                                                <TableCell align="right">Product Quantity</TableCell>
                                                <TableCell align="right">Transaction Amount</TableCell>
                                                <TableCell align="right">Transaction ID</TableCell>
                                                <TableCell align="right">Payment Gateway</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>


                                            {
                                                orders.length > 0 ? (

                                                    orders.map((order) => (
                                                        <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                            <TableCell align="right">{order.userDetails.fullName}</TableCell>
                                                            <TableCell align="right">{order.userDetails.mobile}</TableCell>
                                                            <TableCell align="right">{order.userDetails.email}</TableCell>
                                                            <TableCell align="right">{order.productName}</TableCell>
                                                            <TableCell align="right">{order.productAmount}</TableCell>
                                                            <TableCell align="right">{order.productQuantity}</TableCell>
                                                            <TableCell align="right">{order.transactionAmount}</TableCell>
                                                            <TableCell align="right">{order.transactionId}</TableCell>
                                                            <TableCell align="right">{order.paymentGateway}</TableCell>

                                                        </TableRow>
                                                    ))
                                                ) : (<p>No data to display.</p>)
                                            }


                                        </TableBody>
                                    </Table>
                                </TableContainer>



                            </div>


                        ) : ('')
                    }
                    {
                        categoryModule ? (
                            <div className='categoryModule'>




                                <div className='btnPosition'>

                                    <button onClick={() => handleOpenModal('category')} className='addButton p-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'>Add Category</button>

                                </div>

                                <div className='category'>
                                    <div className='addCatagory'>

                                    </div>
                                    <div className='categoryTable'>
                                        <TableContainer className='mt-3'>
                                            <Table aria-label="simple table">
                                                <TableHead className='bg-gray-100 text-center'>
                                                    <TableRow>
                                                        <TableCell align="center">Category Name</TableCell>
                                                        <TableCell align="center">Status</TableCell>
                                                        <TableCell align="center">Date</TableCell>
                                                        <TableCell align="center">Edit</TableCell>
                                                        <TableCell align="center">Delete</TableCell>


                                                    </TableRow>

                                                </TableHead>
                                                <TableBody>
                                                    {categories.map((category) => (

                                                        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                            <TableCell align="center">
                                                                {category.categoryName}
                                                            </TableCell>

                                                            <TableCell align="center"><button className={category.status === 'Active' ? 'btn btn-primary' : 'btn btn-inactive'}>
                                                                {category.status == false ? 'Inactive' : 'Active'}
                                                            </button></TableCell>
                                                            <TableCell align="center">{category.updatedAt}</TableCell>
                                                            <TableCell align="center"><button onClick={() => edit('category', category)}> <IconButton > <MdEdit /></IconButton></button></TableCell>
                                                            <TableCell align="center"><button onClick={() => deleteMethod('category', category._id)} ><IconButton><MdDelete /></IconButton></button></TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                        </TableContainer>

                                        <ToastContainer />

                                    </div>




                                    {/* add category modal */}


                                    <Modal isOpen={isCategoryModalOpen} onClose={handleCloseModal} className="fixed inset-0 flex items-center justify-center">
                                        <div className="bg-white w-96 p-6 rounded-lg ">
                                            {/* Modal Header */}
                                            <h1 className="text-2xl font-bold mb-4">{categoryActionType} Category</h1>

                                            {/* Form with Formik */}
                                            <Formik
                                                initialValues={{
                                                    categoryName: initialCategoryName,
                                                }}
                                                validationSchema={categorySchema}
                                                onSubmit={categorySubmit}
                                            >
                                                {({ errors, touched }) => (
                                                    <Form>
                                                        {/* Input Field */}
                                                        <Field
                                                            type="text"
                                                            placeholder="Product category name"
                                                            name="categoryName"
                                                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                                        />
                                                        {errors.categoryName && touched.categoryName ? (
                                                            <div className="text-red-500">{errors.categoryName}</div>
                                                        ) : null}

                                                        <div className='mt-3'>
                                                            <input onChange={(e) => imageSelected(e.target.files)} type='file' />

                                                            <div className='h-100 w-150 mt-3 '>
                                                                <img className='rounded-md' src={selectedImage}></img>
                                                            </div>

                                                        </div>
                                                        <div className='flex justify-between'>
                                                            {/* Close Modal Button */}
                                                            <button onClick={handleCloseModal} className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                                                                Close
                                                            </button>
                                                            {/* Submit Button */}
                                                            <button
                                                                type="submit"
                                                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                                            >
                                                                {categoryActionType}
                                                            </button>

                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>

                                        </div>
                                    </Modal>






                                </div>


                            </div>



                        ) : ("")

                    }





                </div>
            </div>

        </div>

    )
}

export default home