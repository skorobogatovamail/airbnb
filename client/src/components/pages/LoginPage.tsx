import React from 'react';
import LoginForm from '../ui/LoginForm';

export default function LoginPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
