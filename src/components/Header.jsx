import headerImage2 from "../assets/header2.png";

const Header = () => {
  return (
    <header className="relative w-full h-[400px] overflow-hidden text-white shadow-lg">
      {/* Background image */}
      <img
        src={headerImage2}
        alt="Header background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-100/60 to-orange-200/80"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-6 z-10">
        <div className="flex items-center justify-center space-x-4 md:space-x-12 mt-10">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-amber-800 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold">🐂</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-7xl font-bold tracking-wide text-amber-700">
              Mana Edla Pandalu
            </h1>
          </div>
          <div className="w-10 h-10 md:w-16 md:h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🏆</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-amber-700 font-semibold text-sm md:text-xl mt-1 bg-amber-200 px-4 py-2 rounded-full inline-block shadow-lg">
            ఎడ్ల పందాలు మన పల్లె గౌరవం, మన తెలుగు శౌర్యం
          </p>

          <div className="mt-6 flex justify-center gap-6 items-center">
            <div className="border-b-4 rounded-full border-amber-500 w-32"></div>
            <div className="w-10 h-10 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">🐂</span>
            </div>
            <div className="border-b-4 rounded-full border-amber-500 w-32"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
