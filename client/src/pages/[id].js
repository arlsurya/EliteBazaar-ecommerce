import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

export default productById;