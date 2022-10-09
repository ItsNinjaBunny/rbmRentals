import { useState } from 'react';
import supportImg from '../../assets/support.jpg';
import { supportCards } from '../shared/template';
import { ContactForm } from '../shared/Forms/Contact/ContactForm';
import { SupportCard } from './SupportCard';

export const Support = () => {
	const [active, setActive] = useState(false);;

	return (
		<div className='w-full mt-24'>
			<div className='w-full h-[700px] bg-gray-900/90 absolute'>
				<img className='w-full h-full object-cover mix-blend-overlay' src={supportImg} alt='/' />
			</div>
			<div className='max-w-[1240px] mx-auto text-[#F5FAFA] relative'>
				<div className='px-4 py-12'>
					<h2 className='text-3xl pt-8 text-slate-300 uppercase text-center '>Support</h2>
					<h3 className='text-5xl font-bold py-6 text-center'>Finding the right team</h3>
					<p className='py-4 text-3xl text-slate-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, culpa! Maxime fugit dignissimos tempora optio non ex accusamus quidem, sit distinctio deserunt nostrum unde temporibus iste ratione, porro cumque earum.</p>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-3 relative
					gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>
					{
						supportCards.map(card => (
							<SupportCard key={card.id} title={card.title} desc={card.desc} active={active} setActive={() => setActive(!active)} />
						))
					}
				</div>
				<ContactForm active={active} setActive={() => setActive(!active)} />
			</div>
		</div>
	);
}