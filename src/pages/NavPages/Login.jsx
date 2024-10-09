import { useState } from 'react'; 

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Email:', email);
        console.log('Password:', password);
       
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}> 
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email} 
                            onChange={handleEmailChange} 
                            required
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}  
                            onChange={handlePasswordChange} 
                            required
                            className="w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
