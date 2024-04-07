import Image from "next/image";

const About = () => {
  return (
    <div className="xl:px-32 flex flex-col gap-4">
      <article className="flex-center md:flex-row flex-col xl:gap-16 gap-8 xl:px-32">
        <Image
          src={"/assets/about.avif"}
          alt="about"
          width={300}
          height={300}
          priority
          loading="eager"
        />
        <div className="flex flex-col gap-8 px-16">
          <p className="p-regular-18">
            <span className="h2-bold">A</span>t De-Wine, our journey began with
            a simple passion for wine. Founded with a vision to bring the finest
            wines from around the world to our customers, we embarked on a
            mission to curate a collection that celebrates the diversity and
            richness of winemaking traditions.
          </p>
          <p className="p-regular-18">
            <span className="h2-bold">F</span>rom our humble beginnings, we have
            grown into a trusted destination for wine enthusiasts, offering a
            carefully curated selection that reflects our commitment to quality
            and excellence. Over the years, we have forged strong relationships
            with renowned wineries and producers, allowing us to source the most
            exceptional wines for our customers.
          </p>
        </div>
      </article>
      <div className="flex-center md:flex-row-reverse flex-col xl:gap-16 gap-8 xl:px-32">
        <Image
          src={"/assets/about2.avif"}
          alt="about"
          width={300}
          height={300}
          priority
          loading="eager"
        />
        <div className="flex gap-8 flex-col px-16">
          <p className="p-regular-18">
            <span className="h2-bold">D</span>riven by a relentless pursuit of
            excellence, we continually strive to expand our offerings and
            explore new horizons in the world of wine. Whether it&apos;s
            discovering rare vintages, championing emerging winemakers, or
            providing expert guidance to our customers, we are dedicated to
            delivering an unparalleled experience at every step of the journey.
          </p>
          <p className="p-regular-18">
            <span className="h2-bold">A</span>s we look towards the future, our
            passion for wine remains as vibrant as ever. We are excited to
            continue sharing our love for wine with you and to be a part of your
            own wine journey. Thank you for choosing De-Wine, where every bottle
            tells a story and every sip is an adventure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
