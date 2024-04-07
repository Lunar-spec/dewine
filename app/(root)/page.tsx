import Button from "@/components/shared/Button/Button";
import Card from "@/components/shared/Card/Card";
import { products } from "@/constants";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      <article
        id="landing"
        className="h-[40rem] !scroll-smooth overflow-x-hidden relative bg-glass md:bg-oneFourth bg-half bg-no-repeat bg-center"
      >
        <div className="flex-between flex-col md:flex-row h-full">
          <div className="flex-col flex md:w-1/2 items-start gap-8">
            <span className="h1-bold mx-auto text-wrap w-full md:w-3/4 font-semibold text-center md:text-left">
              Explore the <br />
              <span className="text-brand-primary">Timeless </span>
              classics.
            </span>
          </div>
          <div className="flex items-end flex-col justify-end gap-2 md:mx-auto h-full pb-8 md:pb-16">
            <span className="h2-medium">
              Crafted to <span className="text-brand-primary">Perfection</span>.
            </span>
            <span className="flex justify-center w-full">
              <Button text="Explore Divinity" to="#visit" />
            </span>
          </div>
        </div>
        <aside className="absolute text-lg top-1/2 tracking-wider right-0 transform -translate-y-1/2 translate-x-16 rotate-90">
          <span className="text-brand-primary">Vintage</span> Revelations
        </aside>
      </article>
      {/* About Section */}
      <article id="about" className="flex-center flex-col gap-8 px-8 py-4">
        <section className="h2-bold flex justify-center items-center w-full">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">Who are we?</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </section>
        <section className="flex xl:flex-row flex-col w-full justify-center items-center gap-16">
          <Image
            src={"/assets/glass4.avif"}
            alt="glass"
            width={800}
            height={800}
            loading="eager"
            className="object-contain object-center"
          />
          <div className="w-full text-justify flex flex-col gap-8">
            <p className="md:w-4/5 md:leading-7">
              <span className="text-5xl font-semibold">N</span>estled amidst the
              serene landscapes of a Northern sanctuary lies our newly
              established vineyard, a testament to the allure of untouched
              expanses. Envisioned in a vast expanse of pristine wilderness, our
              vineyard embraces the untouched beauty of the north, where rolling
              hills and endless skies converge to create an idyllic setting for
              cultivating exceptional grapes.
            </p>
            <div className="flex w-full justify-end">
              <p className="md:w-4/5">
                <span className="text-5xl font-semibold">I</span>n this tranquil
                haven, where the air is crisp and the soil rich with promise, we
                have embarked on a journey to craft wines of distinction. With
                ample space stretching as far as the eye can see, our vineyard
                is a canvas awaiting the strokes of dedication and passion from
                our skilled artisans.
              </p>
            </div>
            <p className="md:w-4/5">
              <span className="text-5xl font-semibold">H</span>ere, amidst the
              rugged beauty of the north, we nurture our vines with care,
              allowing them to thrive under the watchful gaze of towering
              mountains and whispering winds. Each grape bears the essence of
              the land, embodying the untamed spirit of the wilderness that
              surrounds us.
            </p>
            <div className="flex w-full justify-end">
              <p className="md:w-4/5">
                <span className="text-5xl font-semibold">A</span>s the sun casts
                its golden hues upon the sprawling vineyard, we are reminded of
                the boundless possibilities that lie ahead. With every passing
                season, we harvest not only grapes but also dreams, weaving
                together the story of our vineyard&apos;s legacy in the northern
                wilderness.
              </p>
            </div>
            <p className="md:w-4/5">
              <span className="text-5xl font-semibold">J</span>oin us on this
              remarkable journey as we invite you to experience the magic of our
              vineyard, where the vastness of space meets the richness of flavor
              in every bottle of wine we craft.
            </p>
          </div>
        </section>
      </article>
      {/* Specials */}
      <article id="specials" className="px-8 py-4 flex-center flex-col gap-8">
        <section className="h2-bold flex justify-center items-center w-full">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">Our Specials</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </section>
        <section className="flex flex-wrap gap-16 w-full justify-center">
          {products.slice(0, 4).map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </section>
        <Button text="View More" to="/products" />
      </article>
      {/* Visit Us */}
      <article id="visit" className="px-16 py-4 flex flex-col gap-8">
        <section className="h2-bold flex justify-center items-center w-full">
          <span className="border-b border-gray-300 flex-grow"></span>
          <span className="px-4">Visit Us</span>
          <span className="border-b border-gray-300 flex-grow"></span>
        </section>
        <section className="flex-center xl:flex-row flex-col">
          <aside className="xl:w-3/4">
            {/* Gallery */}
            <div className="container mx-auto px-5 py-2 lg:px-16 flex items-center">
              <div className="flex flex-row justify-center sm:flex-wrap">
                <div className="flex w-1/2 md:w-1/4 lg:w-1/2 flex-wrap flex-row">
                  <div className="lg:w-1/2 w-full p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center"
                      src="/assets/grapes2.avif"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:w-1/2 w-full p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center"
                      src="/assets/vineyard2.avif"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center max-h-none lg:max-h-[1000px]"
                      src="/assets/sunset2.avif"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="flex w-full sm:w-1/2 flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center"
                      src="/assets/vineyard5.avif"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center"
                      src="/assets/grapes3.avif"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 p-1 md:p-2">
                    <Image
                      width={500}
                      height={500}
                      alt="gallery"
                      className="block h-full w-full object-cover object-center"
                      src="/assets/vineyard3.avif"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <section className="xl:w-1/2 leading-7">
            <p>
              <span className="text-5xl font-semibold">N</span>estled amidst
              vast expanses of rolling hills and fertile terrain, our vineyard
              sprawls across acres of picturesque landscape, offering visitors
              an immersive journey into the world of winemaking. Guided by our
              knowledgeable experts, embark on a tour through the
              vineyard&apos;s intricate network of grapevines, where each row
              tells a story of dedication and craftsmanship. Experience
              firsthand the meticulous care that goes into nurturing our grapes,
              from bud break to harvest, as you learn about the art and science
              of viticulture.
            </p>
            <p>
              <span className="text-5xl font-semibold">A</span>s you wander
              through the vineyard, soak in the breathtaking views of lush
              greenery and sun-dappled rows of vines, all while sampling our
              exceptional wines crafted from the very fruits of this land.
              Whether you&apos;re a wine enthusiast or a curious traveler, a
              visit to our vineyard promises an enriching experience, where the
              beauty of nature intertwines with the rich heritage of winemaking,
              leaving you with memories to cherish long after you depart.
            </p>
          </section>
        </section>
      </article>
    </div>
  );
};

export default Home;
