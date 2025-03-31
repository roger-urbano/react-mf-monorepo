import React, { useState, useLayoutEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 
import { useDarkMode } from '../context/ThemeContext';

export default function ThemeSwitch() {
   const {darkMode, setDarkMode} = useDarkMode();
  
    return (
      <div className="absolute top-4 right-4 bg-slate-100 p-3 rounded-lg dark:bg-zinc-800">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only"
            />
            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div
              className={`absolute w-6 h-6 bg-white rounded-full shadow -top-1 transition-transform duration-300 ${darkMode ? 'translate-x-full' : 'translate-x-0'}`}
            ></div>
          </div>
          <span className="ml-3 text-sm text-gray-700 dark:text-gray-300" >
            {darkMode ? (
                <MoonIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              )}
          </span>
        </label>
      </div>
    );
  }