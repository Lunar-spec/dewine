const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>;
};

export default ProtectedLayout;
