import {
    ClipboardDocumentListIcon,
    Cog8ToothIcon,
    HomeModernIcon,
    ArrowSmallRightIcon
} from '@heroicons/react/24/solid';
import { props } from './Support.props';

export const SupportCard = (props: props) => {

    const handleIcon = (title: string) => {
        switch (title) {
            case 'Management':
                return <ClipboardDocumentListIcon className='w-16 p-4 bg-indigo-600 text-[#F5FAFA]
                rounded-lg mt-[-4rem]'/>;
            case 'Technical Support':
                return <Cog8ToothIcon className='w-16 p-4 bg-indigo-600 text-[#F5FAFA]
                rounded-lg mt-[-4rem]' />;
            case 'Rental Inquiries':
                return <HomeModernIcon className='w-16 p-4 bg-indigo-600 text-[#F5FAFA]
                rounded-lg mt-[-4rem]' />;
        }
    };

    return (
        <div className='bg-[#F5FAFA] rounded-xl shadow-2xl'>
            <div className='p-8'>
                {handleIcon(props.title)}
                <h3 className='font-bold text-2xl my-6'>{props.title}</h3>
                <p className='text-gray-600 text-xl'>{props.desc}</p>
            </div>
            <div className='bg-[#F5FAFA] pl-8'>
                <p className={`flex items-center mb-10 cursor-pointer 
                    hover:font-bold duration-200 text-indigo-600 ${props.active ? 'pointer-events-none' : '' }`}
                    onClick={() => props.setActive()} >
                        Contact Us
                    <ArrowSmallRightIcon className='w-5 ml-2' />
                </p>
            </div>
        </div>
    );
}