const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[9999] overflow-visible flex justify-center bg-[#010101]">
      <span className="size-12 m-auto relative before:content-[''] before:w-12 before:h-[5px] before:bg-black before:opacity-25 before:absolute before:top-[60px] before:left-0 before:rounded-[50%] before:animate-shadow after:content-[''] after:size-full after:bg-primary after:absolute after:top-0 after:left-0 after:rounded-[4px] after:animate-loader-spinner" />
    </div>
  );
};

export default Preloader;
