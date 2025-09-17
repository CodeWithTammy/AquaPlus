import React from 'react'

const AddProducts = () => {
  return (
    <div className="ml-[20rem] flex flex-col items-center justify-center min-h-full p-6 bg-white overflow-x-hidden">
      <div className="flex flex-col items-center justify-center gap-3 text-center max-w-4xl w-full">
        <h1 className="text-3xl lg:text-5xl font-bold text-primary">
          🚧 Page Under Construction
        </h1>
        <h2 className="text-sm lg:text-lg text-gray-600">
          We're working on this page! Stay tuned for updates.
        </h2>
      </div>

      <img
        className="w-full max-w-lg mt-6 object-contain"
        src="/images/constructionimage.png"
        alt="Under Construction"
      />
    </div>
  )
}

export default AddProducts
