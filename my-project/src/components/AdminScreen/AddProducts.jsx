import React from "react";

const AddProducts = () => {
  return (
    <div className="ml-0 md:ml-[20rem] flex flex-col items-center justify-center min-h-full p-4 md:p-6 bg-white overflow-x-hidden">
      
      {/* Message Container */}
      <div className="flex flex-col items-center justify-center gap-3 text-center max-w-4xl w-full px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          🚧 Page Under Construction
        </h1>
        <h2 className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
          We're working on this page! Stay tuned for updates.
        </h2>
      </div>

      {/* Construction Image */}
      <img
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 sm:mt-6 object-contain"
        src="/images/constructionimage.png"
        alt="Under Construction"
      />
    </div>
  );
};

export default AddProducts;
