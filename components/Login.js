'use client'
import React, { useState } from 'react';
import { Fugaz_One } from 'next/font/google';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"]
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState(''); // New error state
  const { signup, login } = useAuth();

  async function handleSubmit() {
    setError(''); // Reset the error state before submitting
    if (!email || !password || password.length < 6) {
      setError('Please enter a valid email and a password with at least 6 characters.');
      return;
    }

    setAuthenticating(true);

    try {
      if (isRegister) {
        console.log('Signing up a new user');
        await signup(email, password);
      } else {
        console.log('Logging in an existing user');
        await login(email, password);
      }
    } catch (err) {
      console.error(err.message);
      setError('Invalid email or password. Please try again.'); // Set error message
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl medium:text-6xl ' + fugaz.className}>
        {isRegister ? 'Register' : 'Log In'}
      </h3>

      <p>You&apos;re one step away!</p>

      {/* Error Message */}
      {error && <p className='text-red-500 text-center'>{error}</p>}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 duration-200 hover:border-indigo-600 focus:border-indigo-600 rounded-full outline-none'
        placeholder='Email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 duration-200 hover:border-indigo-600 focus:border-indigo-600 rounded-full outline-none'
        placeholder='Password'
        type='password'
      />

      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting...' : 'Submit'} full />
      </div>

      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className='text-indigo-600'
        >
          {isRegister ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}
