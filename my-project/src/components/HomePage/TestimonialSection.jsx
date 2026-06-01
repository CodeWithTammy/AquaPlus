import React from "react";

const TestimonialSection = () => {
  const reviews = [
    {
      initials: "W.F",
      stars: 5,
      review:
        "We have a new pool and had no idea about maintenance. I contacted a couple of places but no one responded. Aqua Care Plus Pools responded quickly via WhatsApp and followed up with a call. Even though they did not service our area, they still took time to review photos of our pool and gave detailed advice on how to get it running properly. Very professional and helpful.",
    },
    {
      initials: "Z.S",
      stars: 5,
      review: "Very professional and diligent service.",
    },
    {
      initials: "K.P",
      stars: 5,
      review:
        "100% professional, exceptional customer service and excellent final results on my pool.",
    },
    {
      initials: "A.D",
      stars: 5,
      review:
        "Outstanding service from start to finish. The team was professional, responsive, and delivered great results.",
    },
  ];

  return (
    <section className="w-full py-24 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <p className="text-secondbasecolor font-semibold uppercase tracking-widest">
          Testimonials
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3">
          What Our Clients Say
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Real feedback from our satisfied customers.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-16 lg:px-28">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex mb-4">
              {Array.from({ length: review.stars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  ★
                </span>
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 italic leading-relaxed mb-6">
              "{review.review}"
            </p>

            {/* Anonymous User */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondbasecolor text-white flex items-center justify-center font-bold text-lg">
                {review.initials}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Verified Customer
                </h4>
                <p className="text-sm text-gray-500">Client Review</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;