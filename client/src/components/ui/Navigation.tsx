import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export default function Navigation(): JSX.Element {
  const user = useAppSelector((store) => store.authFirebase.user);
  return (
    <div>
      <header className="flex justify-between">
        <a href="/" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">airbnc</span>
          <span className="font-bold text-xl ml-10">
            Hi, {user.status === 'logged' ? user.user.name : 'Guest'}
          </span>
        </a>
        <div className="flex border border-gray-300 rounded-full px-4 py-2 gap-2 shadow-md shadow-gray-300 mr-md-10">
          <div className="mx-md-10 flex  items-center">
            <button type="button">
              <Link to="/signup">SignUp</Link>
            </button>
          </div>
          <div className="border-l border-gray-3000" />
          <div className="mx-md-10 flex  items-center">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </div>
          <div className="border-l border-gray-3000" />
          <div className="mx-md-10 my-2 flex  items-center">
            <button type="button">Logout</button>
          </div>
          <div className="border-l border-gray-3000" />
          <div className=" bg-primary p-1 rounded-full text-white mx-1 my-2 flex  items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </header>
    </div>
  );
}
