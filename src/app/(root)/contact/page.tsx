import Image from "next/image";

const Contact = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <Image
          src={"/assets/glass3.avif"}
          alt="contact"
          width={2400}
          height={2400}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex-1 flex items-center gap-24 flex-col py-16">
        <p className="h2-bold">ENQUIRE</p>
        <p className="p-regular-18">
          Enquire about the best wine on offer, visiting details and more.
        </p>
        <form className="flex flex-col items-center gap-4 w-3/4">
          <input
            className="text-lg outline-none border-b bg-transparent border-white w-full"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <input
            className="text-lg outline-none border-b bg-transparent border-white w-full"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <textarea
            className="text-lg outline-none border-b bg-transparent border-white w-full"
            placeholder="Message"
            name="message"
            required
          />
          <button
            className="text-lg my-4 py-2 px-4 bg-brand-primary w-1/2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
