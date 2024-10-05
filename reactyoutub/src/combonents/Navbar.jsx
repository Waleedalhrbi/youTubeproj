import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();  

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="btn btn-ghost btn-circle lg:hidden">
          <img width="24" height="24" src="https://img.icons8.com/material/24/menu--v1.png" alt="menu--v1"/>
          </button>

 
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
            className="h-6 cursor-pointer hidden lg:inline"
            onClick={() => navigate('/home')} 
          />
        </div>

        <div className="flex-grow mx-4 lg:max-w-2xl relative">
          <img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1" className='absolute left-1 top-1/2 transform -translate-y-1/2' />
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-sharp/24/keyboard.png"
            alt="keyboard"
            className='absolute left-10 top-1/2 transform -translate-y-1/2'
          />
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full pl-10 text-right"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="btn btn-ghost btn-circle">
            <img width="24" height="24" src="https://img.icons8.com/material/24/bell--v1.png" alt="bell--v1"/>
          </button>

          <button className="btn btn-ghost btn-circle">
            <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/video-call.png" alt="video-call"/>
          </button>
          <div className="avatar">
            <div className="w-8 h-8 rounded-full">
              <img src="https://i.pinimg.com/564x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
