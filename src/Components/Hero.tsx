import { TextAreaForm } from "./TextArea";

export const Hero = () => {
  return (
    <>
      <div className=" flex flex-col   items-center justify-center h-screen ">
        <h1
          className="text-3xl md:text-6xl bg-gradient-to-r from-blue-600  to-green-700
          p-4  rounded-md px-4 text-white pb-4 w-fit"
        >
          Sentiment Analysis{" "}
        </h1>
        <p className="text-sm md:text-xl text-center  text-neutral-400 mt-4 max-w-xs md:max-w-2xl  mx-auto ">
          This is a sentiment analysis app. It uses the
          <span className="text-xl  p-2 m-2 bg-gradient-to-tr from-blue-500 to-green-500 text-bold text-white rounded-md">
            <a
              className=" hover:underline"
              href="https://gemini.google.com/app?gad_source=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gemini
            </a>
          </span>
          API to perform sentiment analysis on the text.
        </p>
        {/*TODO:  TextArea Form */}
        <TextAreaForm />
      </div>
    </>
  );
};

export default Hero;
