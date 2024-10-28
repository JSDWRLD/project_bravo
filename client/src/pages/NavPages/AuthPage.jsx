import { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${isLogin ? 'Logging in' : 'Registering'} with:`, { email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-retro mb-6 text-center text-indigo-400">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-700 text-black py-3 rounded-lg hover:bg-indigo-500 transition-transform transform hover:scale-105"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:underline mt-2"
          >
            {isLogin ? 'Create an account' : 'Go to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
