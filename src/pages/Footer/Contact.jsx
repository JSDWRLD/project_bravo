import Navbar from '/src/components/Navbar.jsx';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-black py-10 text-center text-gray-200" />
      <section className="contact container mx-auto my-10 p-6 bg-black text-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-400 text-center mb-6">Contact Us</h2>
        <article className="flex flex-col md:flex-row">
          <div className="flex-1 mb-4 md:mr-4">
            <img src="img/contact.jpg" className="w-full h-auto rounded-lg" alt="Contact" />
          </div>
          <div className="flex-1">
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                cols="30"
                rows="10"
                placeholder="Message..."
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-700 text-black py-2 rounded-lg hover:bg-indigo-500 transition">
                Send Message
              </button>
            </form>
            <hr className="my-4 border-gray-500" />
            <div className="flex flex-col items-start">
              <span className="text-lg">Find us on:</span>
              <div className="flex space-x-4 mt-2">
                <a href="." aria-label="Facebook">
                  <i className="fab fa-facebook-square text-indigo-400 hover:text-indigo-300"></i>
                </a>
                <a href="." aria-label="Instagram">
                  <i className="fab fa-instagram text-indigo-400 hover:text-indigo-300"></i>
                </a>
                <a href="." aria-label="Twitter">
                  <i className="fab fa-twitter text-indigo-400 hover:text-indigo-300"></i>
                </a>
                <a href="." aria-label="Pinterest">
                  <i className="fab fa-pinterest text-indigo-400 hover:text-indigo-300"></i>
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>
      <footer className="bg-black text-gray-400 py-4 text-center text-sm">
        &copy; 2024 Your Shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
