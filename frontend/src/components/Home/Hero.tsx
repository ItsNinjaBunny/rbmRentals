import bgImg from '../../assets/cyber-bg.png';
import { services } from '../shared/template';
import { HeroCard } from './HeroCard';

export const Hero = () => {
    return (
        <div className='w-full h-[100vh] bg-zinc-200 flex flex-col justify-between' >
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto' >
                <div className='flex flex-col justify-center md:items-start md:pl-20 sm:items-center items-center w-full px-2 py-8' >
                    <p className='text-2xl' >Rental & Property Group</p>
                    <h1 className='py-3 text-5xl md:text-7xl font-bold' >Property Management</h1>
                    <p className='text-2xl md:ml-8' >- Rentals by Mora</p>
                    <button className='hover-button py-3 px-6 md:w-[100%] w-[60%] my-4' >Get Started</button>
                </div>
                <div>
                    <img className='w-full' src={bgImg} alt='/'/>
                </div>
                <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[-5%]
                    mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 border 
                    border-slate-300 rounded-xl text-center shadow-2xl' >
                    <p className='mb-4 text-2xl'>Services</p>
                    <div className='flex justify-between flex-wrap px-4'>
                        {services.map(service => (
                            <HeroCard key={service.id} title={service.title} to={service.to}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}