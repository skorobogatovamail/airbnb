import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { userLoginFormSchema } from '../../types/authTypes';
import { loginThunk } from '../../redux/slices/auth/authThunks';
import UniversalForm from './UniversalForm';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const inputs = [
    {
      name: 'email',
      type: 'email',
      label: 'email',
      placeholder: 'your email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'password',
      placeholder: 'your password',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    const data = userLoginFormSchema.parse(formdata);
    void dispatch(loginThunk(data));
  };
  return <UniversalForm inputs={inputs} onSubmit={handleSubmit} buttonText="Register" />;
}
