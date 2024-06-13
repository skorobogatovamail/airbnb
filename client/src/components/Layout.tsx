import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './ui/Navigation';

export default function Layout(): JSX.Element {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <Navigation />
      <Outlet />
    </div>
  );
}
