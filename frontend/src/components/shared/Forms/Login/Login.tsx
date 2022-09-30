import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { validateEmail } from '../../../../helper/regex/email';
import axios from 'axios';
import { User } from '../../../../types/user.type';

type props = {
  active: boolean;
  setActive: CallableFunction;
  user: User;
  setUser: CallableFunction;
}

const useClickOutside = (active: boolean, func: CallableFunction, setBlank: CallableFunction) => {
  const ref = useRef(null);

  useEffect(() => {
    let maybeHandler = (e: { target: any; }) => {
      if (!ref.current.contains(e.target) && active !== false) {
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

export const Login = (props: props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  
  const setToBlank = () => {
    setEmail('');
    setPassword('');
  }

  const onKeyDown = e => {
    if(e.key === 'Enter') {
      submitForm();
    }
  }
  
  const submitForm = async () => {
    if(email === '' || password === '') {
      setError('*All fields must be filled*');
      setIsError(true);
      setToBlank();
      return;
    }

    if(validateEmail(email)) {
      setError('*Not a valid Email*');
      setIsError(true);
      setToBlank();
      return;
    }

    try {
      const result = await axios.post('http://localhost:8080/auth/login', { username: email, password: password });
      const { accessToken, refreshToken } = result.data;

      const response = await axios.get('http://localhost:8080/auth/details', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
      
      props.setUser({
        ...response.data,
        rt: refreshToken
      });
      console.log(props.user);

    } catch (error) {
      if(error.response.status === 401) {
        setError('*Invalid Credentials*');
        setIsError(true);
        setToBlank();
      }
    }

  }


  const ref = useClickOutside(props.active, () => props.setActive(), setToBlank);

  return (
    <div ref={ref} className={`${props.active ? 'duration-[450ms] opacity-100' : 'duration-[450ms] opacity-0 pointer-events-none'} overlay`}>
      <div className='bg-[#F5FAFA] rounded-2xl shadow-2xl p-8 fixed flex flex-col left-[50%] top-[600%] 
                translate-x-[-50%] translate-y-[-50%]'>
        <XMarkIcon className='absolute text-indigo-600 w-10 right-[1rem] top-[1rem] cursor-pointer' onClick={() => props.setActive()} />
        <p className='text-3xl pb-4 ml-5 text-indigo-700 font-bold'>Sign In</p>
        <div className='flex flex-col  border-black-[2px] p-4'>
          <div className='input_container'>
            <input className='contact_input' type='email' value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              onKeyDown={onKeyDown}
            />
            <label className='placeholder_text'>
              <div className='text' >Email</div>
            </label>  
          </div>
          <div className='input_container'>
            <input className='contact_input ' type='password' value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              onKeyDown={onKeyDown}
            />
            <label className='placeholder_text'>
              <div className='text' >Name</div>
            </label>
          </div>
        </div>
        <p className={`${isError ? 'flex justify-center items-center pb-4 text-red-600' : 'opacity-0 pointer-events-none pb-4' }` }>{error}</p>
        <button type='submit' className='relative w-[50%] left-[50%] translate-x-[-50%] px-3 py-3 sign-in text-indigo-600' onClick={submitForm} >Sign In</button>
      </div>
    </div>
  )
}