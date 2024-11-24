import Navbar from '/src/components/Navbar.jsx';

const teamMembers = [
  {
    name: "John Dong",
    education: ["Bachelors in Computer Science - CSUS (In progress)"],
    skills: ["Java", "Kotlin", "Android Development", "Distributed Systems", "Go", "Hardware API Development", "Python", "C"],
    awards: ["7x Dean's List, AI Hackathon 1st Place, CSUS Pitch Competition 2nd Place, CSU-WIDE Competition (4x Awards)"],
    experience: [
      "Junior Software Engineer @Revecorp, Inc.",
      "Computer Science ISA @CSUS",
      "Software Engineer Intern @eUnity",
    ],
  },
  {
    name: "Rose Arias-Aceves",
    education: [
      "Bachelors in Computer Science - CSUS (In progress)",
      "Associates in Computer Science - SLCC 2021",
    ],
    skills: ["Linux", "Networking", "C++"],
    experience: ["Linux System Administrator @Franchise Tax Board"],
    awards: ["Security+ (2021)", "RHCSA (2024)"],
  },
  {
    name: "Tadashi Headley",
    education: ["Bachelors in Computer Science - CSUS (In progress)"],
    skills: ["Java", "Client Acquisition"],
    awards: ["California Seal of Biliteracy"],
    experience: [],
  },
  {
    name: "Ritchie Martinez",
    education: ["Bachelors in Computer Science - CSUS (In progress)"],
    skills: ["Java", "R Studio", "Python", "C"],
    awards: ["AI Hackathon 1st Place", "CSUS Pitch Competition 2nd Place", "CSU-WIDE Competition (4x Awards)"],
    experience: ["Medical Lab Tech lll @IDEXX Laboratory", "StartUp Company SentrySight"],
  },
  {
    name: "Yeremi Navarrete",
    education: ["Bachelors in Computer Science - CSUS (In progress)"],
    skills: ["Java", "Window Sheet", "C++"],
    awards: [],
    experience: ["Library Student Assistant @CSUS"],
  },
  {
    name: "Mamon Poian",
    education: [
      "Bachelors in Computer Science - CSUS (In progress)",
      "Minor in Mathematics - CSUS (In progress)",
    ],
    skills: ["Java", "C"],
    awards: [],
    experience: ["IT & Digital Navigator Intern @Asian Resources Inc"],
  },
];

const About = () => {
  return (
    <div className="pt-8 pb-8 min-h-screen flex flex-col bg-gradient-to-br from-gray-950 to-black text-gray-200">
      <Navbar />
      <section className="text-center py-12 ">
        <h1 className="text-4xl font-bold text-indigo-600 font-retro mb-6">Meet the Team</h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          We are a diverse team of six passionate students, each bringing unique skills and experiences. Our shared love
          for retro gaming drives us to deliver an exceptional experience for enthusiasts like you!
        </p>
        <div className="max-w-9xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-75 rounded-lg p-6 shadow-lg text-center flex flex-col items-center border-2 border-indigo-500 animate-glow transition-all hover:scale-105"
              >
                <h2 className="text-2xl font-bold text-indigo-300">{member.name}</h2>
                <div className="text-gray-300 mt-4 text-base space-y-4">
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-lg">Education:</h4>
                    <p className="text-base">{member.education.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-lg">Experience:</h4>
                    {member.experience.length > 0 ? (
                      <div className="space-y-2">
                        {member.experience.map((exp, idx) => (
                          <p key={idx} className="text-base text-gray-300">
                            {exp}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base">None</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-lg">Skills:</h4>
                    <p className="text-base">{member.skills.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="text-indigo-400 font-semibold text-lg">Awards:</h4>
                    <p className="text-base">{member.awards.length > 0 ? member.awards.join(", ") : "None"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10 p-6">
        <div className="max-w-9xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-75 rounded-lg p-6 shadow-lg">
              <h3 className="text-indigo-400 text-2xl font-bold mb-4">Our Mission</h3>
              <p className="leading-relaxed text-base text-gray-300">
                Our mission is to celebrate the golden era of gaming and provide a platform for enthusiasts to rediscover their
                favorite titles. Whether you&apos;re searching for iconic classics or hidden gems, we have something for everyone!
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-75 rounded-lg p-6 shadow-lg">
              <h3 className="text-indigo-400 text-2xl font-bold mb-4">Why Choose Us?</h3>
              <p className="leading-relaxed text-base text-gray-300">
                As students, we understand the value of quality and affordability. Our curated selection is designed to meet the
                needs of every gamer, ensuring you get the best products without breaking the bank.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-75 rounded-lg p-6 shadow-lg">
              <h3 className="text-indigo-400 text-2xl font-bold mb-4">Our Team</h3>
              <p className="leading-relaxed text-base text-gray-300">
                We are a diverse team of six students, each bringing our unique skills and experiences to the table. Together,
                we share a love for retro games and a commitment to excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default About;
