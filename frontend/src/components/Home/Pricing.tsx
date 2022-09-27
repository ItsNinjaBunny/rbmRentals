import { pricing } from '../shared/template';
import { PricingCard } from './PricingCard';

export const Pricing = () => {
    return (
        <div className='w-full text-[#F5FAFA] my-24'>
            <div className='w-full h-[800px] bg-slate-900 absolute mix-blend-overlay'></div>

            <div className='max-w-[1240px] mx-auto py-12'>

                <div className='text-center py-8 text-slate-300'>
                    <h2 className='text-3xl uppercase'>Pricing</h2>
                    <h3 className='text-5xl font-bold text-[#F5FAFA] py-8'>The right price for your research.</h3>
                    <p className='text-3xl'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
                        laudantium odio ullam inventore aliquid ipsum quasi tenetur velit
                        voluptatum iste.
                    </p>
                </div>

                <div className='grid md:grid-cols-2'>
                    {
                        pricing.map(card => (
                            <PricingCard key={card.id} id={card.id} title={card.title} 
                                amenities={card.amenities} desc={card.desc}
                                price={card.price}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
