const teamMembers = [
  {
    name: "John Dong",
    role: "Sheesh",
    imgSrc: "https://dummyimage.com/200x200",
    description: "Sheesh"
  },
  {
    name: "Untitled",
    role: "Untilted",
    imgSrc: "https://dummyimage.com/201x201",
    description: "Untitled"
  },
  {
    name: "Untitled",
    role: "Untilted",
    imgSrc: "https://dummyimage.com/201x201",
    description: "Untitled"
  },
  {
    name: "Untitled",
    role: "Untilted",
    imgSrc: "https://dummyimage.com/201x201",
    description: "Untitled"
  },
  {
    name: "Untitled",
    role: "Untilted",
    imgSrc: "https://dummyimage.com/201x201",
    description: "Untitled"
  },
  {
    name: "Untitled",
    role: "Untilted",
    imgSrc: "https://dummyimage.com/201x201",
    description: "Untitled"
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
