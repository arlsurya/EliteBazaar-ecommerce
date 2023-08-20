import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'


function productById() {
    let  router = useRouter()
    const {id:pid}= router.query;

    const [productId, setProductId] = useState(pid)

    useEffect(()=>{
        setProductId(pid)
        console.log(productId)
    },[])
    

  return (
    <div>

<h1>{pid}</h1>

    </div>
  )
}

export default productById