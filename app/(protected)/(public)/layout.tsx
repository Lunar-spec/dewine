import Navbar from "../_components/Navbar";


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
