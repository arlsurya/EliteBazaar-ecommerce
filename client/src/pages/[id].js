import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LiaPhoenixSquadron } from "react-icons/lia";
import { VscAccount } from "react-icons/vsc";









// api url
const apiURL = process.env.API_BASE_URL

// from the next.config.ts
const IMG_URL = process.env.IMG_BASE_URL


function productById() {
  let router = useRouter()
  const goBack = () => {
    router.back();
  };
  const { id: pid } = router.query;

  const [productId, setProductId] = useState(pid)
  const [product, setProduct] = useState([])

  useEffect(() => {
    setProductId(pid)
    console.log(productId)
    getProduct()

  }, [])


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log(categories)
    setAnchorEl(event.currentTarget);
  };

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

  const getProduct = async () => {
    try {
      const response = await fetch(`${apiURL}/api/user/product/${pid}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          // 'authorization': `Bearer ${getToken}`
        },

      });
      const responseData = await response.json();
      setProduct(responseData.data);
      console.log(product)



    } catch (error) {
      console.log(error)

    }



  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <div

          >
            <div className="h-full overflow-y-auto p-4">
              <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

              <div className="flex items-center justify-between mb-4">
                <div className="w-1/4">
                  <img
                    src="your-image-url.jpg"
                    alt="Product"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-1/4">

                  <button className="bg-gray-200 p-2">-</button>
                  <span className="mx-2">1</span>
                  <button className="bg-gray-200 p-2">+</button>
                </div>
                <div className="w-1/4 text-right">
                  $19.99
                </div>
              </div>

              <div className='flex items-center justify-between mb-4'>
                Total <br/> 
                Shipping

              </div>

              <div className="mt-8">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Checkout
                </button>
              </div>
            </div>
          </div>




        </ListItem>

      </List>


    </Box>
  );


  return (
    <div className="container mx-auto p-4">
      <button
        className="mb-4 text-blue-500 hover:text-blue-600"
        onClick={goBack}
      >
        ← Back
      </button>

      {product ? (
        product.map((item) => (
          <div key={item._id} className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <img
                src={`${IMG_URL}/${item.productImage}`}
                alt="Product"
                className="w-full h-auto"
              />
            </div>

            <div className="w-full md:w-1/2 md:pl-4">
              <h2 className="text-2xl font-semibold mb-4">{item.productName}</h2>
              <p className="text-gray-600 mb-2">{item.productDescription}</p>
              <p className="text-gray-600 mb-2">Color: Blue</p>
              <p className="text-gray-600 mb-2">Size: Large</p>
              <p className="text-2xl text-green-600 font-semibold mb-4">
                {item.productPrice}
              </p>

              <Toolbar>
                {['right'].map((anchor) => (

                  <React.Fragment key={anchor}>
                    <button onClick={toggleDrawer(anchor, true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                      Buy Now
                    </button>


                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >

                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}






              </Toolbar>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Toolbar>
        {['right'].map((anchor) => (

          <React.Fragment key={anchor}>

            {/* <IconButton
             
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}


            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >

              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}






      </Toolbar>
    </div>
  );

}

export default productById;