const teamMembers = [
  {
    name: "John Dong",
    role: "Full Stack Developer & Team Lead",
    imgSrc: "/src/assets/headshots/john.png",
    description: "John was a key developer who handled frontend and backend development, database setup, user authentication, payment integration, and more.\
                  He ensured seamless connectivity between all components of the application.\
                  He is also the project lead and created and divided the work between all members."
  },
  {//John put himself on top, so i put the rest in order that the project brief list 
    name: "Rose Arias-Aceves",
    role: "Brand and Product Manager & Beta/QA Tester",
    imgSrc: "/src/assets/headshots/rose.png",
    description: "Rose helped define the website's brand by researching similar brands, picking color scheme and created the logo.\
                  She also worked on various parts of the website, like integrating social media, adding products, about us and credits page, and worked with John on QA."
   
  },
  {
    name: "Tadashi Headley",
    role: "Documentation Specialist and Project Managment ",
    imgSrc: "/src/assets/headshots/tadashi.png",
    description: "Tadashi facilitated meetings with the Documentation team to ensure project progress and provided support throughout the project.\
                  He also reviewed the teams diagrams as part of his quality assurance efforts, helping to refine their accuracy and consistency."
  },
  {
    name: "Ritchie Martinez",
    role: "UML Diagram & System Modeling Specialist",
    imgSrc: "/src/assets/headshots/ritchie.png",
    description: "Ritchie refined and updated the UML diagrams by adding classes, attributes, methods, and relationships.\
                  He also contributed to system modeling and algorithm work for accurate representation in the system architecture."
  },
  {
    name: "Yeremi Navarrete",
    role: "Documentation & UML Quality Reviewer",
    imgSrc: "/src/assets/headshots/remi.png",
    description: "Remy collaborated with Ritchie on refining relationships, attributes, and directions in the UML diagram.\
                  He also reviewed visual quality consistency of the diagrams and created the flow chart as part of his documentation work."
  },
  {
    name: "Mamon Poian",
    role: "UML diagram & Use Case Specialist",
    imgSrc: "/src/assets/headshots/mamon.png",
    description: "Mamon created the detailed use case diagram which represented the project's requirements.\
                  He also worked on enhancing the login page to improve user experience. Additionally, he contributed input to several other diagrams, helping to ensure consistency throughout the project."
  },
];

const Credits = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black py-12">
      <section className="text-gray-200 body-font relative container mx-auto my-10 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="sm:text-3xl text-2xl font-bold font-retro title-font mb-4 text-indigo-400">Meet the Team</h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            A brief introduction to our talented team members.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <div className="p-4 lg:w-1/2" key={index}>
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt={`team member ${index + 1}`} className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={member.imgSrc} />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-gray-200">{member.name}</h2>
                  <h3 className="text-indigo-500 mb-3">{member.role}</h3>
                  <p className="mb-4">{member.description}</p>
                  <span className="inline-flex">
                    {/*SOCIALS */}
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

export default Credits;
