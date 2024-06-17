import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signupThunk } from '../../redux/slices/authFirebase/authFirebaseThunks';
import { userSignupFormSchema } from '../../types/authTypes';

export default function SignUpForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const inputs = [
    {
      name: 'name',
      type: 'text',
      label: 'name',
      placeholder: 'your name',
    },
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
    const data = userSignupFormSchema.parse(formdata);
    void dispatch(signupThunk(data));
  };
  return (
    <form className=" mx-auto max-w-md" onSubmit={handleSubmit}>
      {inputs.map((inp) => (
        <input {...inp} />
      ))}
      <button type="submit" className="primary">
        Register
      </button>
    </form>
  );
}
