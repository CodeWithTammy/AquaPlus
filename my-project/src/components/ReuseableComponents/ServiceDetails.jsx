import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import Banner from "../ReuseableComponents/BannerSection";
import LoadingScreen from "../LoadingComponent/LoadingScreen";
import Footer from "../HomePage/Footer";
import { CheckIcon } from "@heroicons/react/24/outline";
import RequestSection from "../HomePage/RequestSection";
import { NavbarMenu } from "../../../mockData/data";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { ChevronDown } from "lucide-react"; // or @heroicons/react
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { title } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  // Filter data to map through only services
  const services =
    NavbarMenu.find((item) => item.title === "Services")?.children || [];
  const location = useLocation();

  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/Services/${title}`)
      .then((res) => res.json())
      .then((data) => setDetail(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [title]);

  if (!detail) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <Banner title={detail.bannertext} />

      {/* Main content wrapper */}
      <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
        {/* left side */}
        <div className="hidden w-full lg:w-1/3 md:flex lg:flex flex-col gap-10 ">
          {/* Services Menu Side Bar */}
          <div className="rounded-lg bg-gray-100 shadow-lg">
            <h2 className="text-primary text-2xl text-center pt-5">Services</h2>
            <ul className="text-left m-5 divide-y divide-gray-300">
              {services.map((item) => {
                const isActive = location.pathname === item.link;

                return (
                  <li
                    key={item.id}
                    className={`p-4 flex items-center transition ease-in-out duration-300 
                      ${
                        isActive
                          ? "bg-primary text-white"
                          : "hover:bg-primary hover:text-white"
                      }`}
                  >
                    <Link
                      to={item.link}
                      className="flex items-center gap-1 flex-grow"
                    >
                      {item.title}
                    </Link>
                    <MdKeyboardDoubleArrowRight className="text-2xl ml-auto" />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact form */}
          <section className="bg-red rounded-xl shadow-lg">
            <div className="py-8 lg:py-12 px-6 hidden sm:block max-w-full">
              <h2 className="mb-4 text-3xl sm:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-12 font-light text-center text-white sm:text-lg md:text-xl">
                Your Dream Pool Starts Here Contact Us Today!
              </p>

              {/* Controlled form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  const name = e.target.name.value;
                  const email = e.target.email.value;
                  const message = e.target.message.value;
                  const phone = e.target.phone.value;

                  try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL_PRODUCTION}/api/contact`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, message, phone }),
                    });

                    const data = await res.json();
                    if (res.ok) {
                      Swal.fire({
                        title: "Submitted Successfully!",
                        text: "Your message has been sent. We will contact you within 24 hours.",
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                          confirmButton:
                            "bg-primary text-white font-semibold hover:bg-red",
                        },
                      });
                      e.target.reset();
                    } else {
                      alert("Failed to send: " + data.error);
                    }
                  } catch (err) {
                    console.error("Error:", err);
                    alert("Something went wrong. Try again.");
                  } finally {
                    setLoading(false); // always reset loading
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                    placeholder="(876) 123-4567"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300"
                    placeholder="Leave a comment..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-5 text-sm font-medium text-center rounded-3xl sm:w-fit transition ease-in-out duration-300
                    ${
                      loading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-white text-primary hover:bg-primary hover:text-white"
                    }`}
                >
                  {loading ? <span>Processing...</span> : <>Send Message</>}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* right side */}
        {/* About the Service */}
        <div className="w-full lg:flex-1">
          {detail.title === "Pool Construction" ||
          detail.title === "Commercial Pool Management" ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  🚧 Coming Soon
                </h2>
                <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto">
                  We’re working on bringing you all the details for this
                  service. Check back soon for updates!
                </p>
              </div>
            </div>
          ) : (
            <>
              <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
                    <span className="text-primary">| </span>About This Service
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {detail.aboutservice}
                  </p>
                </div>
                <div>
                  <img
                    src={detail.image}
                    alt="Service"
                    className="rounded-2xl shadow-lg w-full object-cover"
                  />
                </div>
              </section>

              {/* What's Included */}
              <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">
                    What’s Included
                  </h2>

                  <ul className="space-y-3">
                    {detail.whatsincluded?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckIcon className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    )) || (
                      <p className="text-gray-500 text-center">
                        No items listed.
                      </p>
                    )}
                  </ul>
                </div>
              </section>

              {/* Benefits */}
              <section className="py-16 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-12">
                    Why Choose This Service
                  </h2>

                  <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {detail.whythisservice?.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl 
                          transition transform hover:-translate-y-2"
                      >
                        <div className="flex justify-center mb-4">
                          <img
                            src={item.icon}
                            alt="icon"
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 break-words">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.text}</p>
                      </div>
                    )) || (
                      <p className="text-gray-500">No benefits listed.</p>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* faq section */}
      {detail.title === "Pool Construction" ||
      detail.title === "Commercial Pool Management" ? (
        <div className="hidden"></div>
      ) : (
        <>
          <section className="py-16 sm:py-20 bg-primary">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {detail.faq?.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg shadow-sm"
                  >
                    {/* Question */}
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === idx ? null : idx)
                      }
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-white hover:bg-gray-50 hover:text-primary transition"
                    >
                      {faq.question}
                      <ChevronDown
                        className={`w-6 h-6 text-white transition-transform duration-300 ${
                          openIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Answer */}
                    {openIndex === idx && (
                      <div className="px-4 pb-4 text-white animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )) || (
                  <p className="text-gray-200 text-center">No FAQs yet.</p>
                )}
              </div>
            </div>
          </section>

          <RequestSection />
        </>
      )}
      <Footer />
    </>
  );
};

export default ServiceDetails;
