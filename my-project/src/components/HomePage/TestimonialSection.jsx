import React from 'react';

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* First Review - 5 Stars with text */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            <div className="absolute top-4 left-4 text-4xl text-blue-200 font-serif leading-none">
              "
            </div>
            <div className="absolute bottom-4 right-4 text-4xl text-blue-200 font-serif leading-none">
              "
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 text-center italic">
                We contacted AquaCare Plus Pools as new pool owners needing guidance. Although they don't
                service our area, Manager Tyreece responded quickly and provided excellent advice on pool 
                maintenance. He reviewed photos of our pool and gave us expert recommendations to get started. 
                The customer service was exceptional, and he even referred us to another company that could help. 
                Highly recommend!
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Anonymous Client</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <img 
                      src="images/googlelogo.png" 
                      alt="Google" 
                      className="h-3"
                    />
                    <span>Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Review - 4 Stars only */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative flex items-center justify-center">
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Anonymous Client</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <img 
                      src="images/googlelogo.png" 
                      alt="Google" 
                      className="h-3"
                    />
                    <span>Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Review - 5 Stars only */}
          <div className="bg-white rounded-xl shadow-lg p-6 relative flex items-center justify-center">
            <div className="relative z-10 text-center">
              <div className="flex justify-center items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Anonymous Client</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <img 
                      src="images/googlelogo.png" 
                      alt="Google" 
                      className="h-3"
                    />
                    <span>Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://g.page/r/CeHO3I5xb1maEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            Leave Us a Review
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;