const loader = () => {
  return (
    <div className="flex-center h-screen">
      <div className="p-2 animate-spin drop-shadow-lg bg-gradient-to-bl from-brand-primary via-brand-secondary1 to-brand-secondary2 h-14 w-14 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-black/80 background-blur-xl"></div>
      </div>
    </div>
  );
};

export default loader;
