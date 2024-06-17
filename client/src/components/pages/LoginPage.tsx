import React from 'react';
import LoginForm from '../ui/LoginForm';
import UniversalFormPage from './UniversalFormPage';

export default function LoginPage(): JSX.Element {
  return (
    <UniversalFormPage
      pageTitle="Login"
      secondaryPageHeader="Don't have an account?"
      secondaryPageLink="/signup"
      secondaryPageLinkText="Register"
      form={<LoginForm />}
    />
  );
}
