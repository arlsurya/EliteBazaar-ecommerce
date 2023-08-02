import React, { useState } from 'react'
import Modal from '../home/modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function home() {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

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

      const categorySubmit = async(data)=>{
      try {
        console.log(data)
        
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
        <div className='btnPosition'>

            <button  onClick={handleOpenModal} className='addButton'>Add Category</button>

        </div>

            <div className='category'>
                <div className='addCatagory'>
                    
                </div>
                <div className='categoryTable'>
                <table>
      <thead>
        <tr>
          <th>Category Description</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
     
          <tr>
            <td>this is something desc</td>
            <td><button className='btn btn-primary'>Active</button></td>
            <td>July 12, 2023</td> 
            <td><button>E</button><button>D</button></td> 
          </tr>
    
      </tbody>
    </table>
                </div>

                <div>

             

   
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h1>Add Category</h1> 

           <Formik
      initialValues={{
        categoryName: '',
      }}
      validationSchema={categorySchema}
      onSubmit= {categorySubmit }
    >
      {({ errors, touched }) => (
        <Form>
          
          <Field  type="text" placeholder="product category name" name="categoryName" />
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
    )
}

export default home