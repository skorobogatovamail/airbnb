import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../ui/LoginForm';

export default function LoginPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <LoginForm />
        <div className="text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <Link className="underline text-black" to="/signup">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
