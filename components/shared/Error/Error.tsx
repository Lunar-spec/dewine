import Image from "next/image";

const Error = ({ message }: { message: string }) => {
  return (
    <div className="h-screen flex-center flex-col text-5xl font-semibold">
      <Image src="/assets/proHunt.svg" height={300} width={300} alt="proHunt" />
      {message}
    </div>
  );
};

export default Error;
