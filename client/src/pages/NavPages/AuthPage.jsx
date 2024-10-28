import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction, userLoginAction } from '../../redux/Actions/User';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();

  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
  const userLoginReducer = useSelector((state) => state.userLoginReducer);

  const { loading: loginLoading, error: loginError } = userLoginReducer;
  const { loading: registerLoading, error: registerError, userInfo } = userRegisterReducer;

  // Determine the loading and error state based on isLogin
  const loading = isLogin ? loginLoading : registerLoading;
  const error = isLogin ? loginError : registerError;
  const [successMessage, setSuccessMessage] = useState('');


  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);

  const Spinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = `${firstName} ${lastName}`.trim();

    if (isLogin) {
      dispatch(userLoginAction(email, password));
    } else {
      await dispatch(userRegisterAction(name, email, password));

      // Check if the userInfo exists to indicate a successful registration
      if (userRegisterReducer.userInfo) {
        setSuccessMessage('Registration successful! Please log in.');
        // Optionally reset the form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;


  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-10 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-retro mb-6 text-center text-indigo-400">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-200 font-sans">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                  className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder='John'
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-200 font-sans">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                  className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder='Doe'
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-200 font-sans">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-3 mt-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder='name@email.com'
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
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 font-sans">
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
