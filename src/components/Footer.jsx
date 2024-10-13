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
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.014-.608 1.794-1.57 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.923 2.203-4.923 4.923 0 .385.043.76.127 1.122-4.09-.205-7.719-2.164-10.148-5.144-.424.728-.666 1.574-.666 2.476 0 1.707.869 3.213 2.19 4.096-.806-.026-1.566-.247-2.23-.617v.062c0 2.385 1.696 4.374 3.946 4.826-.413.112-.849.172-1.296.172-.317 0-.626-.03-.928-.086.627 1.956 2.445 3.379 4.6 3.419-1.685 1.32-3.808 2.107-6.115 2.107-.398 0-.79-.023-1.177-.068 2.179 1.396 4.768 2.211 7.548 2.211 9.057 0 14.01-7.504 14.01-14.01 0-.213-.005-.426-.015-.637.961-.694 1.796-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.462.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.761v2.315h3.588l-.467 3.621h-3.121v9.295h6.116c.73 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-300 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.976.976 1.248 2.243 1.31 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.336 2.633-1.31 3.608-.976.976-2.243 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.336-3.608-1.31-.976-.976-1.248-2.243-1.31-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.85c.062-1.366.336-2.633 1.31-3.608.976-.976 2.243-1.248 3.608-1.31 1.266-.058 1.646-.069 4.85-.069m0-2.163c-3.259 0-3.667.012-4.947.07-1.594.073-2.688.356-3.633 1.301-.946.946-1.228 2.04-1.301 3.633-.058 1.281-.07 1.689-.07 4.947s.012 3.667.07 4.947c.073 1.594.356 2.688 1.301 3.633.946.946 2.04 1.228 3.633 1.301 1.281.058 1.689.07 4.947.07s3.667-.012 4.947-.07c1.594-.073 2.688-.356 3.633-1.301.946-.946 1.228-2.04 1.301-3.633.058-1.281.07-1.689.07-4.947s-.012-3.667-.07-4.947c-.073-1.594-.356-2.688-1.301-3.633-.946-.946-2.04-1.228-3.633-1.301-1.281-.058-1.689-.07-4.947-.07z"/>
                            <path d="M12 5.838c-3.403 0-6.162 2.76-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-10.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
