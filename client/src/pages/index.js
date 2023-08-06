import Image from 'next/image'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Inter } from 'next/font/google'
import { VscAccount } from "react-icons/vsc";
import { useState, useEffect } from 'react'
import { FaBeer } from 'react-icons/fa';
import { BsSortUp,BsSearch,BsSortDown } from 'react-icons/bs';
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaBars,FaFilter } from 'react-icons/fa';
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


const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '20px',
};

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

const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 25.99,
    description: 'This is the description of product 1.',
    imageUrl: 'product1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 19.99,
    description: 'This is the description of product 2.',
    imageUrl: 'product2.jpg',
  },
  // Add more products here
];


export default function Home() {
  
const [sortToggleBtn,setSortToggleBtn]= useState(false)
  const [age, setAge] = useState('')
  const [name, setName] = useState('')
  
const sortToggle = ()=>{
  setSortToggleBtn((prevState)=>!prevState)
  
  }

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const { loading = true } = true;




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
            <h1>Login / Signup</h1>
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
            <Button color="inherit">Login</Button>
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
      <div><FaFilter/></div>
      <div onClick={sortToggle} className='cursor-pointer' >
        {sortToggleBtn ?  <BsSortUp/> : <BsSortDown/> }
       </div>
  
      <div><BsSearch/></div>

    </div>

    <div>
      <div style={cardContainerStyle}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img
              src={product.imageUrl}
              alt={product.title}
              style={imageStyle}
            />
            <div style={titleStyle}>{product.title}</div>
            <div style={priceStyle}>Price: ${product.price}</div>
            <div style={descStyle}>{product.description}</div>
          </div>
        ))}
      </div>
    </div>
    </div>

);




}

