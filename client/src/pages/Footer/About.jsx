import Navbar from '/src/components/Navbar.jsx';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="py-10 text-center text-gray-200" />
      <section className="text-gray-200 body-font relative container mx-auto my-10 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="sm:text-3xl text-2xl font-bold font-retro title-font mb-4 text-indigo-400">About Us</h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Welcome to Retro Replay, your one-stop shop for all things vintage gaming! We are a group of passionate students dedicated to bringing the nostalgia of classic video games, board games, puzzles, and retro consoles right to your doorstep.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="p-4 lg:w-1/2 w-full">
            <h3 className="text-indigo-500 text-lg font-bold mb-2">Our Mission</h3>
            <p className="leading-relaxed text-base mb-4">
              Our mission is to celebrate the golden era of gaming and provide a platform for enthusiasts to rediscover their favorite titles. Whether you're searching for iconic classics or hidden gems, we have something for everyone!
            </p>
            <h3 className="text-indigo-500 text-lg font-bold mb-2">Why Choose Us?</h3>
            <p className="leading-relaxed text-base mb-4">
              As students, we understand the value of quality and affordability. Our curated selection is designed to meet the needs of every gamer, ensuring you get the best products without breaking the bank.
            </p>
          </div>
          <div className="p-4 lg:w-1/2 w-full">
            <h3 className="text-indigo-500 text-lg font-bold mb-2">Our Team</h3>
            <p className="leading-relaxed text-base mb-4">
              We are a diverse team of six students, each bringing our unique skills and experiences to the table. Together, we share a love for retro games and a commitment to excellent customer service. Join us on this exciting journey through the world of vintage gaming!
            </p>
            <h3 className="text-indigo-500 text-lg font-bold mb-2">Get in Touch!</h3>
            <p className="leading-relaxed text-base mb-4">
              Have questions or suggestions? Feel free to reach out to us! We’d love to hear from fellow gamers and help you find the perfect game.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-black text-gray-400 py-4 text-center text-sm">
        Retro Replay &copy; 2024 All rights reserved.
      </footer>
    </div>
  );
};

export default About;
