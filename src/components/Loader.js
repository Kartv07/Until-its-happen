export default function Loader() {
    return (
      <div className="w-full h-screen flex items-center justify-center relative bg-black">
        <div className="absolute w-[70px] h-[70px] bg-[#53e1e8] rounded-full animate-mid"></div>
        <div className="absolute w-[90px] h-[90px] border-[5px] border-transparent border-t-[#53e1e8] border-b-[#53e1e8] rounded-full animate-spin1"></div>
        <div className="absolute w-[110px] h-[110px] border-[5px] border-transparent border-t-[#53e1e8] border-b-[#53e1e8] rounded-full animate-spin2"></div>
        <div className="absolute w-[130px] h-[130px] border-[5px] border-transparent border-t-[#53e1e8] border-b-[#53e1e8] rounded-full animate-spin3"></div>
        <div className="absolute w-[150px] h-[150px] border-[5px] border-transparent border-t-[#53e1e8] border-b-[#53e1e8] rounded-full animate-spin4"></div>
      </div>
    );
  }
  