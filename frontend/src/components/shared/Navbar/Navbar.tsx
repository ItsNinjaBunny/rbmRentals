import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navbarItems } from '../template'
import { props } from './navItem.interface';
import { NavbarItem } from './NavbarItem';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.jpeg';
import { Login } from '../Forms/Login/Login';
import { User } from '../../../types/user.type';

export const Navbar = () => {
	const [active, setActive] = useState(false);
	const [signIn, setSignIn] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [user, setUser] = useState<User>();

	const openSignIn = () => setSignIn(!signIn);
	const openSignUp = () => setSignUp(!signUp);
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
					<button className={`${signIn ? 'pointer-events-none' : ''} sign-in border-none bg-transparent text-black mr-4`} onClick={openSignIn} >Sign In</button>
					<button className='sign-out px-4 py-3' onClick={openSignUp} >Sign Out</button>
				</div>
				<div className='lg:hidden mr-4' onClick={openMenu}>
					{!active ? <Bars3Icon className='w-10 mr-4 cursor-pointer' /> : <XMarkIcon className='w-10 mr-4 cursor-pointer' />}
				</div>
			</div>
			<Login active={signIn} setActive={() => setSignIn(!signIn)} user={user}
				setUser={(details: User) => {
					setUser(() => ({ ...details }));
				}}
			/>
			<div className={!active ? 'pointer-events-none' : 'duration-[1000ms] absolute bg-zinc-200 w-full px-8 opacity-[.95]'}>
				<ul>
					{navbarItems.map((item: props) => (
						<NavbarItem styles={`${!active ? 'translate-x-[-300rem]' : 'duration-700 '} menu border-b-2 flex flex-col border-zinc-300 w-full mt-4 p-3 ' +
													'hover:text-indigo-600 hover:font-bold duration-[400ms]`}
							key={item.id} to={item.to} title={item.title} />
					))}
					<div className='flex flex-col my-4'>
						<button className={`${!active ? 'translate-x-[-300rem]' : ''} menu sign-in bg-transparent text-indigo-600 px-8 py-3 mb-4`}>Sign In</button>
						<button className={`${!active ? 'translate-x-[-300rem]' : ''} menu sign-out px-8 py-3`}>Sign Up</button>
					</div>
				</ul>
			</div>
		</div>
	)
}