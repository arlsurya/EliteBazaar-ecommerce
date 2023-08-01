import React, { useState } from 'react'


function home() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
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
                <nav>

                    <ul>
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

            <div className='category'>
                <div className='addCatagory'>
                    
                </div>
                <div className='categoryTable'>
                    {/* <table>
                
               
                            <th>S.No</th>
                            <th>Cat. Desc</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>


                    
                        
                    </table> */}
                </div>
            </div>

        </div>
    )
}

export default home