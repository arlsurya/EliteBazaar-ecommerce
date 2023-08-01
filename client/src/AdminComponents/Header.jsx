import React from 'react'
import Avatar from '@mui/material/Avatar';





function Header() {
  return (
    <div className='main'>
        <div className="navbar">
            <div className="navLeftIcon">
                left icon
            </div>
            <div className="brandName">
                Elite Bazar
            </div>
            <div className="profile">
              
                <Avatar alt="Remy Sharp" src="/1.jpg" />
            </div>
        </div>

    </div>
  )
}

export default Header