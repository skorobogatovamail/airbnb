import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { userLoginFormSchema } from '../../types/authTypes';
import { loginThunk } from '../../redux/slices/auth/authThunks';

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formdata = Object.fromEntries(new FormData(e.currentTarget));
    const data = userLoginFormSchema.parse(formdata);
    void dispatch(loginThunk(data));
  };
  return (
    <form className=" mx-auto max-w-md" onSubmit={handleLogin}>
      {inputs.map((inp) => (
        <input {...inp} />
      ))}
      <button type="submit" className="primary">
        Register
      </button>
      <div className="text-center text-gray-500">
        Already a member?{' '}
        <Link className="underline text-black" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
}
