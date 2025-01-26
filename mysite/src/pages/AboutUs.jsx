import React from "react";

const TeamCard = ({ name, role, image }) => {
  return (
    <div className="bg-black text-white rounded-2xl shadow-md w-64 p-4 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="rounded-xl w-60 h-60 object-cover mb-4 border-2 border-gray-500"
      />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-400 text-base">{role}</p>
    </div>
  );
};

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Алибеков Нуртилек',
      role: 'AI Engineer',
      image: '/nurtilek.jpg',
    },
    {
      name: 'Айжамал Курбанбек кызы',
      role: 'Лингвист',
      image: 'aijamal.jpg',
    },
    {
      name: 'Сулайманова Гулшайыр',
      role: 'Лингвист',
      image: '/gulshayir.jpg',
    },
  ];

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/dark.png')" }}
    >
      <h2 className="text-white text-4xl font-bold text-center mb-12">Биздин команда</h2>
      <div className="flex justify-around w-3/4">
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
      <p className="mt-8 text-lg">Биз - Кыргыз-Турк Манас университетинин Компьютердик
        инженерия жана Туркология болумдорунун студенттеринен
        жана мугалимдеринен  тузулгон  командабыз </p>
      <p className="mt-2 text-lg">Биз программалык камсыздоо жана гуманитардык
        илимдерди бириктирип кыргыз тилинин
        грамматикасын уйронуу учун иновациялык проэкт
        сунуштайбыз.
        </p>
    </div>
  );
};

export default AboutUs;
