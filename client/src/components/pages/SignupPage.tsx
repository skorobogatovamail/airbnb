import React from 'react';
import SignUpForm from '../ui/SignUpForm';
import UniversalFormPage from './UniversalFormPage';

export default function SignupPage(): JSX.Element {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <UniversalFormPage
        pageTitle="Register"
        secondaryPageHeader="Don't have an account?"
        secondaryPageLink="/login"
        secondaryPageLinkText="Login"
        form={<SignUpForm />}
      />
    </div>
  );
}
