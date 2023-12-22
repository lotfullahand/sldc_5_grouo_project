import { Link } from "react-router-dom";

import hero1 from "../assets/happy-sisters.jpg";
import hero2 from "../assets/light-1.jpg";
import hero3 from "../assets/school-kid-1.jpg";
import hero4 from "../assets/school-kid.jpg";
import hero5 from "../assets/school-kids.jpg";
const heroImages = [hero1, hero2, hero3, hero4, hero5];
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          We ignite a candle to shine
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          in this lab, we are helping individual students from afghanistan to
          get into the tech world and bridge the gap. we always stand beside our
          sisters in afghanistan and fight for their education.
        </p>
        <div className="mt-10">
          <Link to="/courses" className="btn btn-primary capitalize">
            our courses
          </Link>
        </div>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center space-x-1 bg-neutral rounded-box">
        {heroImages.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-90 object-cover"
              ></img>
            </div>
          );f
        })}
      </div>
    </div>
  );
};
export default Hero;
