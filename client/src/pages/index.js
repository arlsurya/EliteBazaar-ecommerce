import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [age,setAge]= useState('')
  const [name,setName]= useState('')



  return (
    <main
      className={``}
  
    >
      <h1 className='bg-red-400'>Landing page</h1>
      <div className='main'>
        <div className='navbar'>
        
        </div>

      </div>

  
    </main>
  )
}
