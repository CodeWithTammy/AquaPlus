import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
    </div>
  )
}

export default LoadingScreen