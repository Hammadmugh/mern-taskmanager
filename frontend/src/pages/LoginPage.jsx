import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">TaskMaster</h1>
            <p className="text-gray-600">Organize your tasks, boost your productivity</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer Note */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-white">
          <p className="text-sm opacity-90">
            Secure and simple task management
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
