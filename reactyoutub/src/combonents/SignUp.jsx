import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('https://670119e2b52042b542d6c3c3.mockapi.io/Login', {
        username,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/home');
      } else {
        setError('Failed to create account');
      }
    } catch (error) {
      setError('An error occurred during sign up');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-full max-w-sm shadow-xl bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn bg-red-600 text-white hover:bg-red-700 w-full mt-4">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
