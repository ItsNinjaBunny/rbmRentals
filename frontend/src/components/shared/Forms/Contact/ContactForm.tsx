import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'

/*
    regex email type email doesn't work for input box
*/

type props = {
    active: boolean,
    setActive: CallableFunction;
}

const useClickOutside = (active: boolean, func: CallableFunction, setBlank: CallableFunction) => {
    const ref = useRef(null);

    useEffect(() => {
        let maybeHandler = e => {
            if(!ref.current.contains(e.target) && active !== false) {
                func();
                setBlank();
            }
        }

        document.addEventListener('mousedown', maybeHandler);
        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        };
    });

    return ref;
}

export const ContactForm = (props: props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setPhone] = useState('');
    const [inquiry, setInquiry] = useState('');

    const setToBlank = () => {
        setName('');
        setEmail('');
        setSubject('');
        setPhone('');
        setInquiry('');
    }



    const submitForm = (e: React.FormEvent) => {
        if(name === '' || email === '' || subject === '' || 
            phone === '' || inquiry === '') {
            setToBlank();
            return;
        }
        
    }

    const ref = useClickOutside(props.active, () => props.setActive(), setToBlank);

    return (
        <div ref={ref} className={`${props.active ? 'duration-[450ms] opacity-100' : 'duration-[450ms] opacity-0 pointer-events-none'} overlay`}>
            <div className='bg-[#F5FAFA] rounded-2xl shadow-2xl p-8 fixed flex flex-col left-[50%] top-[50%] 
                translate-x-[-50%] translate-y-[-50%]'>
                <XMarkIcon className='absolute text-indigo-600 w-10 right-[1rem] top-[1rem] cursor-pointer' onClick={() => props.setActive()}/>
                <p className='text-3xl pb-4 ml-5 text-indigo-700 font-bold'>Contact Us</p>
                <div className=' flex flex-row  border-black-[2px]'>
                    <div className='input_container'>
                        <input className='contact_input ' type='text' value={name}
                            onChange={e => setName(e.currentTarget.value)}
                        />
                        <label className='placeholder_text'>
                            <div className='text' >Name</div>
                        </label>
                    </div>
                    <div className='input_container'>
                        <input className=' contact_input' type='email' value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                        <label className='placeholder_text'>
                            <div className='text' >Email</div>
                        </label>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='input_container'>
                        <input className='contact_input ' type='text' value={subject}
                            onChange={e => setSubject(e.currentTarget.value)}
                        />
                        <label className='placeholder_text'>
                            <div className='text' >Subject</div>
                        </label>
                    </div>
                    <div className='input_container'>
                        <input className=' contact_input' type='phone' value={phone}
                            onChange={e => setPhone(e.currentTarget.value)}
                        />
                        <label className='placeholder_text'>
                            <div className='text' >Phone</div>
                        </label>
                    </div>
                </div>
                <div className='input_container'>
                    <input className='contact_area ' value={inquiry}
                        onChange={e => setInquiry(e.currentTarget.value)}
                        maxLength={100}
                    />
                    <label className='area_placeholder_text'>
                        <div className='area_text' >Inquiry</div>
                    </label>
                    <p className='character_count text-sm'>{100 - inquiry.length}/{100}</p>
                </div>
                <p className={` relative w-[50%] translate-x-[-50%] left-[50%] text-base font-bold text-red-600 pb-4 text-center`} >*All Fields are required*</p>
                <button className='relative w-[50%] left-[50%] translate-x-[-50%] px-3 py-3 hover-button' onClick={submitForm} >Submit</button>
            </div>
        </div>
    )
}