import wallpaper from '/src/assets/homepage.gif';

const Home = () => {
  return (
    <div>
      <header>
        Text Here
      </header>
      <main>
        <div className="promotion relative">
          <h1>IMAGE HERE FOR Promotional stuff</h1>
          <div className="w-full h-0 pb-[56.25%] relative overflow-hidden">
              <img src={wallpaper} className="absolute inset-0 w-full h-full object-cover" alt="Promotional" />
              <div className="absolute inset-0 flex items-start justify-center z-10 top-1/2 mt-10">
                <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 cursor-pointer">
                  Shop Now
                </button>
              </div>
          </div>
        </div>
        <div className="favorites">
          Show clickable icons
        </div>
        <div className="retrogames"></div>
        <div className="boardgames"></div>
        <div className="puzzles"></div>
      </main>
      <footer>
        CREDITS AND CONTENT DOWN HERE
      </footer>
    </div>
  );
}

export default Home;
