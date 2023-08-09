import Image from 'next/image'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Inter } from 'next/font/google'
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from 'react'
import { FaBeer } from 'react-icons/fa';
import { BsSortUp, BsSearch, BsSortDown } from 'react-icons/bs';
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaBars, FaFilter } from 'react-icons/fa';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { TbCategory } from "react-icons/tb";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LiaPhoenixSquadron } from "react-icons/lia";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useRouter } from 'next/router';
import userLogin from './user/login'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';




const cardStyle = {
  width: '300px',
  padding: '10px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '5px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const priceStyle = {
  fontSize: '16px',
  color: 'green',
  marginBottom: '5px',
};

const descStyle = {
  fontSize: '14px',
  color: '#555',
};
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


// api url
const apiURL = process.env.API_BASE_URL

export default function Home() {


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log(categories)
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (value)=>{
    handleClose()
    console.log(value)
    getFilterCategoryProduct(value)


  }

  const getFilterCategoryProduct = async(value)=>{
    
    try {
      // let getToken = localStorage.getItem(process.env.localStorage.token)
      const response = await fetch(`${apiURL}/api/user/products?category=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': `Bearer ${getToken}`
        },
      });
      const responseData = await response.json();
      setProducts(responseData.data.products);
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }


  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  // router
  const router = useRouter();

  const [isLoginUser, setIsLoginUser] = useState(false)
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortToggleBtn, setSortToggleBtn] = useState(false)



  const getProducts = async () => {
    try {
      // let getToken = localStorage.getItem(process.env.localStorage.token)
      const response = await fetch(`${apiURL}/api/user/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': `Bearer ${getToken}`
        },
      });
      const responseData = await response.json();
      setProducts(responseData.data.products);
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
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


  useEffect(() => {
    getProducts()
    getCategory()
  }, [])

  const sortToggle = () => {
    console.log(products.products)

    setSortToggleBtn((prevState) => !prevState)

  }

  const clickLogin = () =>{

    router.push('/user/login')
  }



  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Login/SignUP', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
        <ListItem disablePadding>
          <ListItemButton>
            <LiaPhoenixSquadron />
            <ListItemIcon>

              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

            </ListItemIcon>
           
            {
              isLoginUser ? (<h1>User Name</h1>) : (  <h1>Login / Signup</h1>)

            }

            <ListItemText />
            <VscAccount />
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List>
        {['All Category', 'My Orders', 'My Wishlist', 'My Account'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <TbCategory /> : <MailIcon />} */}
                {text == 'All Category' ? <TbCategory /> : ''}
                {text == 'My Orders' ? <RiShoppingBag3Line /> : ''}
                {text == 'My Wishlist' ? <MdOutlineFavoriteBorder /> : ''}
                {text == 'My Account' ? <VscAccount /> : ''}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>


      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#808080' }}>
          <Toolbar>
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  onClick={toggleDrawer(anchor, true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>


                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}



            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Elite Bazar
            </Typography>
         
         {
          isLoginUser ? (<h1>Hello User</h1>) : ( <Button onClick={clickLogin}  color="inherit">Login</Button>)

         }
           
          </Toolbar>
        </AppBar>
      </Box>

      <div>
        <img
          src="https://img.freepik.com/free-vector/modern-black-friday-sale-banner-template-with-3d-background-red-splash_1361-1877.jpg?w=1060&t=st=1691337012~exp=1691337612~hmac=a09d43e26f6eee03e09f41061e7aa4b79b1d3c1130ac8b1f03bd2bb4f9cc2012"
          alt="img"
          style={imageStyle}
        />
      </div>

      <div className='m-10 flex justify-between'>
        <div className='cursor-pointer'>
         <Tooltip title="category">
          <IconButton  onClick={handleClick}>
            <FaFilter />
          </IconButton>
          </Tooltip>

        </div>
        <div onClick={sortToggle} className='cursor-pointer' >
          <Tooltip title={sortToggleBtn ? 'Low To High' : "High To Low"}>
            <IconButton>
              {sortToggleBtn ? <BsSortUp /> : <BsSortDown />}
            </IconButton>
          </Tooltip>
        </div>


        <div className='cursor-pointer'>
          <IconButton >
            <BsSearch />
          </IconButton>
        </div>

      </div>

      <div className='flex'>
        {
        products ? (
          products.map((product) => (
            <div key={product._id} style={cardStyle}>
            <img
              src='https://img.freepik.com/free-vector/modern-black-friday-sale-banner-template-with-3d-background-red-splash_1361-1877.jpg?w=1060&t=st=1691337012~exp=1691337612~hmac=a09d43e26f6eee03e09f41061e7aa4b79b1d3c1130ac8b1f03bd2bb4f9cc2012'
              alt={product.title}
              style={imageStyle}
            />
            <div style={titleStyle}>{product.productName}</div>
            <div style={priceStyle}>Price: रु‎ {product.productPrice}</div>
            <div >{product.productDescription}</div>

            <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
       
      >
        Open Menu
      </Button>
      

    <div> 
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
           {categories.map((item) => (
         <MenuItem key={item.id} onClick={() => handleSelect(item.categoryName)}>
         {item.categoryName}
       </MenuItem>
        ))}
      </Menu>
    </div>
  


   
          </div>
         
          ))
          ) : "" 
        }


      </div>
    </div>

  );




}

