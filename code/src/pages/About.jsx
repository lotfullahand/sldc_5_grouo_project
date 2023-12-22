const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          Welcome to
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              AMU
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
      Welcome to Tech Lab more than an online learning platform, we're your trusted destination for coding education in Afghanistan.
      Committed to quality and accessibility, our curated courses cater to all Afghan students. Join us on this empowering journey in tech education!  
      </p>
    </>
  );
};
export default About;
