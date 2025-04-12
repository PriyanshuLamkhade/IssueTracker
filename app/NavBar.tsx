import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";


const NavBar = () => {
    const links=[
        {label:'DashBoard',href:'/'},
        {label:'Issues',href:'/issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>  <li><Link key={link.href}
            className='hover:text-zinc-400 text-white transition-colors'
             href={link.href}>{link.label}</Link></li>)}
           
        </ul>
    </nav>
  )
} 

export default NavBar