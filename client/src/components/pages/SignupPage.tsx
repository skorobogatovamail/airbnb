import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../ui/SignUpForm';

export default function SignupPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <SignUpForm />
        <div className="text-center text-gray-500">
          Already a member?{' '}
          <Link className="underline text-black" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
