import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../../redux/Actions/User';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Watches for state changes
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { loading, error } = userLoginReducer;

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  const Spinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-retro mb-6 text-center text-indigo-400">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 font-sans">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="name@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200 font-sans">Password</label>
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
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 font-sans">Don&apos;t have an account?</p>
          <Link to="/register" className="text-indigo-400 hover:underline mt-2">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;