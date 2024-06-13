import React from 'react';
import SignUpForm from '../ui/SignUpForm';

export default function SignupPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
