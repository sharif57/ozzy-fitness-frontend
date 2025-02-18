// app/layout.tsx
'use client'
import React from 'react';
import '../globals.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ToastContainer } from 'react-toastify';
// import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <Provider store={store}>
        {children}
        <ToastContainer  position="top-center" autoClose={1000}/>
        </Provider>
      </body>
    </html> 
  );
}