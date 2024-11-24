import { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [status, setStatus] = useState(""); // To track form status

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus(""); // Reset status before sending

    emailjs
      .sendForm(
        "service_blto3a2", 
        "template_993js7s", 
        e.target, 
        "HyUnnjQrnbm99UILs" 
      )
      .then(
        () => {
          setStatus("Message sent. Wait to hear back from us."); // Success message
        },
        (error) => {
          console.error("EmailJS Error:", error); // Log the error
          setStatus("Something went wrong. Please try again."); // Error message
        }
      );

    e.target.reset(); // Clear the form fields
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="py-10 text-center text-gray-200" />
      <section className="text-gray-200 body-font relative container mx-auto my-10 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="sm:text-3xl text-2xl font-bold font-retro title-font mb-4 text-indigo-400">Contact Us</h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We’d love to hear from you! Fill out the form below or reach out to us through our social media.
          </p>
        </div>
        <form onSubmit={sendEmail} className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="from_name" className="leading-7 text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name" 
                  className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="from_email" className="leading-7 text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email" 
                  className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-200 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="font-retro flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg transition">
                Send Message
              </button>
            </div>
          </div>
        </form>
        {status && <p className="text-center text-indigo-400 mt-4">{status}</p>}
        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-600 text-center">
          <p className="text-indigo-400">Find us on:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="." aria-label="Facebook" className="text-gray-400 hover:text-indigo-300">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="." aria-label="Instagram" className="text-gray-400 hover:text-indigo-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="." aria-label="Twitter" className="text-gray-400 hover:text-indigo-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="." aria-label="Pinterest" className="text-gray-400 hover:text-indigo-300">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
          <p className="leading-normal my-5">retroreplayme@gmail.com</p>
          <p className="leading-normal my-5">6000 J Street, Sacramento, CA 95819, United States</p>
        </div>
      </section>
      <footer className="bg-black text-gray-400 py-4 text-center text-sm">
        Retro Replay &copy; 2024 All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
