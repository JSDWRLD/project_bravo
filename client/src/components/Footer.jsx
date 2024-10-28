import { NavLink } from 'react-router-dom';
import logo from '/src/assets/full_logo.PNG';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Footer Links */}
                <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                    <NavLink to="/contact" className="text-sm font-retro text-indigo-600 hover:text-indigo-300 transition">
                        Contact
                    </NavLink>
                    <NavLink to="/credits" className="text-sm font-retro text-indigo-600 hover:text-indigo-300 transition">
                        Credits
                    </NavLink>
                    <NavLink to="/about" className="text-sm font-retro text-indigo-600 hover:text-indigo-300 transition">
                        About
                    </NavLink>
                </nav>

                {/* Branding / Logo */}
                <div className="flex items-center justify-center text-indigo-600 font-semibold text-lg md:text-xl mb-4 md:mb-0">
                    <img src={logo} alt="Retro Replay Logo" className="h-10 md:h-12 lg:h-16 w-auto mr-2" />
                    <span>© {new Date().getFullYear()}</span>
                </div>

                <div className="flex space-x-6">
                    {/* Placeholder icons for social media */}
                    <a href="https://x.com/replayreplayme" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.014-.608 1.794-1.57 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.923 2.203-4.923 4.923 0 .385.043.76.127 1.122-4.09-.205-7.719-2.164-10.148-5.144-.424.728-.666 1.574-.666 2.476 0 1.707.869 3.213 2.19 4.096-.806-.026-1.566-.247-2.23-.617v.062c0 2.385 1.696 4.374 3.946 4.826-.413.112-.849.172-1.296.172-.317 0-.626-.03-.928-.086.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.107-6.115 2.107-.398 0-.79-.023-1.177-.068 2.179 1.396 4.768 2.211 7.548 2.211 9.057 0 14.01-7.504 14.01-14.01 0-.213-.005-.426-.015-.637.961-.694 1.796-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/retroreplayme" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.761v2.315h3.588l-.467 3.621h-3.121v9.295h6.116c.73 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/retroreplayme/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.976.976 1.248 2.243 1.31 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.336 2.633-1.31 3.608-.976.976-2.243 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.336-3.608-1.31-.976-.976-1.248-2.243-1.31-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.85c.062-1.366.336-2.633 1.31-3.608.976-.976 2.243-1.248 3.608-1.31 1.266-.058 1.646-.069 4.85-.069m0-2.163c-3.259 0-3.667.012-4.947.07-1.594.073-2.688.356-3.633 1.301-.946.946-1.228 2.04-1.301 3.633-.058 1.281-.07 1.689-.07 4.947s.012 3.667.07 4.947c.073 1.594.356 2.688 1.301 3.633.946.946 2.04 1.228 3.633 1.301 1.281.058 1.689.07 4.947.07s3.667-.012 4.947-.07c1.594-.073 2.688-.356 3.633-1.301.946-.946 1.228-2.04 1.301-3.633.058-1.281.07-1.689.07-4.947s-.012-3.667-.07-4.947c-.073-1.594-.356-2.688-1.301-3.633-.946-.946-2.04-1.228-3.633-1.301-1.281-.058-1.689-.07-4.947-.07z"/>
                            <path d="M12 5.838c-3.403 0-6.162 2.76-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-10.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/retroreplayme/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="currentColor"/>
                            <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="currentColor"/>
                            <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="currentColor"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="currentColor"/>
                        </svg>
                    </a>
                    <a href="https://www.tiktok.com/@retroreplayme" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
