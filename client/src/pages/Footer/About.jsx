import Navbar from '/src/components/Navbar.jsx';

const teamMembers = [
  {
    name: "John Dong",
    education: ["Bachelors in computer science - CSUS (In progress)"],
    skills: ["Java", "Kotlin", "Android Development", "Distributed Systems", "Go", "Hardware API Development"],
    awards: ["AI Hackathon, place: 1st Place"],
    experience: [
      "Junior Software Engineer @Revecorp, Inc.", 
      "Computer Science ISA @CSUS",
      "Software Engineer Intern @eUnity"]
  },
  {
    name: "Rose Arias-Aceves",
    education: [
      "Bachelors in computer science - CSUS (In progress)",
      "Associates in computer science - SLCC 2021",
    ],
    skills: ["Linux", "Networking", "C++"],
    experience: ["Linux System Administrator at Franchise Tax Board"],
    awards: ["Security+ (2021)", "RHCSA (2024)"],
  },
  {
    name: "Tadashi Headley",
    education: ["Bachelors in computer science - CSUS (In progress)"],
    skills: ["Java", "Client acquisition"],
    awards: ["California Seal of Biliteracy"],
    experience: [],
  },
  {
    name: "Ritchie Martinez",
    education: ["Bachelors in computer science - CSUS (In progress)"],
    skills: ["Java", "R Studio", "Python", "C"],
    awards: ["AI Hackathon 1st Place", "CSUS Pitch Competition 2nd Place", "CSU-WIDE Competition (4x Awards)"],
    experience: [],
  },
  {
    name: "Yeremi Navarrete",
    education: ["Bachelors in computer science - CSUS (In progress)"],
    skills: ["Java (intermediate)", "Window Sheet", "C++ (beginner)"],
    awards: [],
    experience: ["Library Student Assistant"],
  },
  {
    name: "Mamon Poian",
    education: [
      "Bachelors in computer science - CSUS (In progress)",
      "Minor in Mathematics - CSUS (In progress)",
    ],
    skills: ["Java", "C"],
    awards: [],
    experience: ["IT/ Digital Navigator intern @Asian Resources Inc"],
  },
];


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


      {/* Started by copying previous section then copied over the teamMembers list and implementation from credits */}
      <section className="text-gray-200 body-font relative container mx-auto my-10 p-6 rounded-lg shadow-lg">
        <div class="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div className="p-4 lg:w-1/2" key={index}>
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <div className="flex-grow sm:pl-8">
                <h2 className="text-gray-200 text-lg font-bold mb-2">{member.name}</h2>

                {/* Render Education, each entry on a new line */}
                {/* This is really a brute force way to render if list exist and to join with commas if so\
                    and if not to not break if it doenst, got the insperation from here:\
                    https://react.dev/learn/conditional-rendering*/}
    
                <h3 className="text-indigo-500 mb-1">Education: </h3>
                  <h3 className="text-gray-300">
                    {Array.isArray(member.education) ? member.education.join(", ") : member.education}
                </h3>


                {/* Skills */}
                <div className="mb-3">
                  <h3 className="text-indigo-500 mb-1">Skills:</h3>
                  <h3 className="text-gray-300">
                    {Array.isArray(member.skills) ? member.skills.join(", ") : member.skills}
                  </h3>
                </div>

                {/* Awards */}
                <div className="mb-3">
                  <h3 className="text-indigo-500 mb-1">Awards: </h3>
                  <h3 className="text-gray-300">
                    {Array.isArray(member.awards) ? member.awards.join(", ") : member.awards}
                  </h3>
                </div>

                {/* render Experience on its own line? */}
                <div className="mb-3">
                  <h3 className="text-indigo-500 mb-1">Experience: </h3>
                  <h3 className="text-gray-300">
                    {Array.isArray(member.experience) ? member.experience.join(", ") : member.experience}
                  </h3>
                </div>

                <span className="inline-flex">
                </span>
              </div>
            </div>
            </div>
          ))}
        </div>
      </section>



      <footer className="bg-black text-gray-400 py-4 text-center text-sm">
        Retro Replay &copy; 2024 All rights reserved.
      </footer>
    </div>
  );
};

export default About;
