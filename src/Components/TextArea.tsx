import { useState } from "react";

export function TextAreaForm() {
  // use state hook to store  textarea input  value  pew pew
  const [text, setText] = useState(" ");

  // function to get the text from the textarea input value
  const getText = (): void => {
    setText(text);
    console.log("set Text " + setText);
    console.log(text);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        <div>
          {/*TODO:  TextArea Form */}
          <label className=" flex-col text-lg font-bold text-pink-700 uppercase shadow-lg   ">
            {" "}
            write the comment here{" "}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment here....."
            className="w-full justify-center h-28 shadow-lg border-spacing-x-3.5 p-5 shadow-blue-600 resize-none rounded-lg ring-card-foreground-100 backdrop:
 border border-fuchsia-500 "
          ></textarea>
        </div>

        {/*TODO:  Button */}

        <button
          onClick={() => {
            getText();
          }}
          type="submit"
          className=" 
          uppercase font-extrabold text-pink-800 mt-8 relative inline-flex items-center justify-center p-0.5 mb-2
          overflow-hidden text-sm 
          rounded-lg group bg-gradient-to-br from-cyan-500
          to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4
          focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            submit
          </span>
        </button>
      </div>
    </>
  );
}

{
  /*TODO: button funciton */
}
