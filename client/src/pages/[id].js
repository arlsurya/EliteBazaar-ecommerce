import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


function productById() {
  let router = useRouter()

  const goBack = () => {
    router.back();
  };
  const { id: pid } = router.query;

  const [productId, setProductId] = useState(pid)

  useEffect(() => {
    setProductId(pid)
    console.log(productId)
  }, [])


  return (

    <div className="container mx-auto p-4">
      <button
        className="mb-4 text-blue-500 hover:text-blue-600"
        onClick={goBack}
      >
        ← Back
      </button>

      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <img
            src=""
            alt="Product"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-4">
          <h2 className="text-2xl font-semibold mb-4">Product Title</h2>
          <p className="text-gray-600 mb-2">Color: Blue</p>
          <p className="text-gray-600 mb-2">Size: Large</p>
          <p className="text-2xl text-green-600 font-semibold mb-4">
            $99.99
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default productById;