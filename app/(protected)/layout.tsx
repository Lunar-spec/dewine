import Navbar from "./_components/Navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
