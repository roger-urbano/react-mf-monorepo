import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthForm from './components/AuthForm';
import ThemeSwitch from './components/ThemeSwitch';
import { UserIcon, UserCircleIcon  } from '@heroicons/react/24/solid';

function App() {

  return (
      <div className="min-h-screen bg-slate-200 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors flex flex-col items-center justify-center px-4 relative">
        <ThemeSwitch />
        <div className="w-full max-w-md bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-2">
          <UserCircleIcon  className="h-16 w-16 text-indigo-600 dark:text-blue-400" />
        </div>
          <h1 className="text-center text-2xl font-bold mb-6">
            Bienvenido 
          </h1>
          <AuthForm />
        </div>
      </div>
  );
}

export default App

