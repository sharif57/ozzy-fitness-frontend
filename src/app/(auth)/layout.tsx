// app/layout.tsx
'use client'
import React from 'react';
import '../globals.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
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

        </Provider>
      </body>
    </html> 
  );
}