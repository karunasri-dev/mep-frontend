import headerImage from "../assets/header.jpg";

const Header = () => {
  return (
    <header className="relative w-full h-[400px] overflow-hidden">
      {/* Background image */}
      <img
        src={headerImage}
        alt="Header"
        className="w-full h-full object-cover"
      />

      {/* Mist layer */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        <h1 className="text-4xl font-bold">Your Heading</h1>
      </div>
    </header>
  );
};

export default Header;
