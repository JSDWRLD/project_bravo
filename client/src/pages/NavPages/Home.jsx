import Card from '/src/components/Card.jsx'; 
import Footer from '/src/components/Footer.jsx'; 
import wallpaper from '/src/assets/homepage.gif';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop/retro-games');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-br from-gray-950 to-black py-12 text-center text-gray-200" />
      <main className="pt-30 font-retro"> 
        <div className="promotion relative text-center text-white">
          <div className="w-full h-0 pb-[65.25%] relative overflow-hidden">
            <img src={wallpaper} className="absolute inset-0 w-full h-full object-cover" alt="Promotional" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20 top-1/4">
              <button 
                onClick={handleShopNowClick}
                className="bg-indigo-700 text-black py-4 px-12 rounded-lg hover:bg-indigo-500 hover:scale-105 transform transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="favorites w-full text-center p-4 bg-black rounded-lg shadow-lg my-8">
          <h2 className="mb-4">
            <span className="text-3xl font-bold text-indigo-400">
              A few of our
            </span>
            <br />
            <span className="text-3xl font-bold text-indigo-400">
              Favorites
            </span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
            <div className='grid w-full place-content-center px-4 py-12 text-slate-900'>
              <Card/>
            </div>
            <div className='grid w-full place-content-center px-4 py-12 text-slate-900'>
              <Card/>
            </div>
            <div className='grid w-full place-content-center px-4 py-12 text-slate-900'>
              <Card/>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {/* <div className="retrogames bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition">
            Retro Games
          </div>
          <div className="boardgames bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition">
            Board Games
          </div>
          <div className="puzzles bg-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition">
            Puzzles
          </div> */}
        </div>
      </main>

      <footer className="bg-black text-gray-400 py-4 text-center text-sm">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
