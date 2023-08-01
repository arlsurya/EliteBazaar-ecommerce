import React, { useState } from 'react'


function home() {
const [isOpen , setIsOpen] = useState(true)

const toggleSidebar = ()=>{
    setIsOpen(!isOpen)
  }

  return (
    <div className='main'>
        <div className='header'>
       
        
        <h3>3 bar</h3>
        <h3>Elite Bazar</h3>
        <h3>user icon</h3>
             
        </div>
        <div className={`sidebar ${isOpen ? 'open' : ''} `}>
        <div className='toggleBtn' onClick={toggleSidebar}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>

        </div>
        <h3>3 bar</h3>

            <nav>

                <ul>
                    <li>home</li>
                    <li>home</li>
                    <li>home</li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default home