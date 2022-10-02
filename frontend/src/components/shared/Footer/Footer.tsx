import {
	FaFacebook,
	FaInstagram,
	FaYelp
} from 'react-icons/fa';

export const Footer = () => {

	return (
		<div className='w-full mt-24 bg-slate-900 text-gray-300 py-8 px-2'>
			<div className='max-w-[1240px] mx-auto grid md:grid-cols-6  grid-cols-2 border-b-2 border-gray-600 py-8'>
				<div>
					<h6 className='font-bold uppercase pt-2'>Solutions</h6>
					<ul>
						<li className='py-1'>Marketing</li>
						<li className='py-1'>Anayltics</li>
						<li className='py-1'>Commerce</li>
						<li className='py-1'>Cloud</li>
						<li className='py-1'>Data</li>
					</ul>
				</div>
				<div>
					<h6 className='font-bold uppercase pt-2'>Support</h6>
					<ul>
						<li className='py-1'>Pricing</li>
						<li className='py-1'>Documentation</li>
						<li className='py-1'>Guides</li>
						<li className='py-1'>API Status</li>
					</ul>
				</div>
				<div>
					<h6 className='font-bold uppercase pt-2'>Company</h6>
					<ul>
						<li className='py-1'>About</li>
						<li className='py-1'>Blogs</li>
						<li className='py-1'>Jobs</li>
						<li className='py-1'>Press</li>
						<li className='py-1'>Partners</li>
					</ul>
				</div>
				<div className='col-span-2 pt-8 md:pt-2'>
					<p className='font-bold uppercase'>Subscribe to our newsletter</p>
					<p className='py-4'>The latest news, articles, and resources, sent to your inbox weekly</p>
					<form className='flex flex-col sm:flex-row'>
						<input type="email" className='focus:outline w-full p-2 mr-4 rounded-md mb-4 text-black' />
						<button className='p-2 mb-4'>Subscribe</button>
					</form>
				</div>
			</div>
			<div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
				<p className='py-4'>2022 RBM Rentals, LLC. All rights reserved</p>
				<p className='py-4'>12598 Central Ave, Suite 218 | Chino, CA 91710 | 626.269.3475</p>
				<div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
					<a rel='noopener noreferrer' target='_blank' href='https://www.facebook.com/RentalsbyMora'><FaFacebook /></a>
					<a rel='noopener noreferrer' target='_blank' href='https://www.instagram.com/rbmrentals/?hl=en'><FaInstagram /></a>
					<a rel='noopener noreferrer' target='_blank' href='https://www.yelp.com/biz/rentals-by-mora-chino-2'><FaYelp /></a>
				</div>
			</div>
		</div>
	)
}