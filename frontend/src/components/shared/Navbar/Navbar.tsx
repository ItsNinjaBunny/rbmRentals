import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navbarItems } from '../template'
import { props } from './navItem.interface';
import { NavbarItem } from './NavbarItem';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.jpeg';

export const Navbar = () => {
    const [active, setActive] = useState(false);
    const openMenu = () => setActive(!active);

    return (
        <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg' >
            <div className='px-2 flex justify-between items-center w-full h-full' >
                <div className='flex items-center'>
                    <h1 className='text-3xl font-bold mr-4 sm:text-4xl cursor-pointer'>
                        <Link to='/' >
                            <img className='w-[12rem]' src={logo} alt='' />
                        </Link>
                    </h1>
                    <ul className='hidden lg:flex'>
                        {navbarItems.map((item: props) => (
                            <NavbarItem styles={'px-2 py-1 m-1 lg:m-3 nav-hover border-b-[4px]'} key={item.id} to={item.to} title={item.title} />
                        ))} 
                    </ul>
                </div>
                <div className='hidden lg:flex pr-4'>
                    <button className='sign-in border-none bg-transparent text-black mr-4'>Sign In</button>
                    <button className='sign-out px-4 py-3'>Sign Out</button>
                </div>
                <div className='lg:hidden mr-4' onClick={openMenu}>
                    {!active ? <Bars3Icon className='w-10 mr-4' /> : <XMarkIcon className='w-10 mr-4' />}
                </div>
            </div>
            <ul className={!active ? 'hidden' : 'absolute bg-zinc-200 w-full px-8 '}>
                {navbarItems.map((item: props) => (
                    <NavbarItem styles={'border-b-2 flex flex-col border-zinc-300 w-full mt-4 p-3 ' + 
                        'hover:text-indigo-600 hover:font-bold duration-[400ms]' } 
                        key={item.id} to={item.to} title={item.title} />
                ))}
                <div className='flex flex-col my-4'>
                    <button className='sign-in bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign In</button>
                    <button className='sign-out px-8 py-3'>Sign Up</button>
                </div>
            </ul>
        </div>
    )
}