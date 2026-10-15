import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import Banner from "../ReuseableComponents/BannerSection";
import SEO from "../SEO";

const resources = [
  {
    title: "The First 28 Days Done Right = 10+ Years of Zero Stress",
    category: "Pool Startup Guide",
    date: "Free resource",
    image: "https://res.cloudinary.com/diwfc48gr/image/upload/v1772324232/pool_repairs_and_restoration_xjgtkj.png",
    summary:
      "A practical step-by-step guide for properly curing a newly plastered, quartz, or pebble pool surface during the first 28 days.",
    details:
      "Covers fill timing, brushing routines, water balance checks, chlorine timing, and the most common mistakes that shorten the life of a new pool finish.",
    link: "/resources/pool-startup-guide",
  },
  {
    title: "Pool Maintenance Basics for Homeowners",
    category: "Pool Care Guide",
    date: "Free resource",
    image: "https://res.cloudinary.com/diwfc48gr/image/upload/v1746651431/brushingtile_yoow5k.jpg",
    summary:
      "A simple care checklist for routine cleaning, circulation, and chemical checks to keep your pool clear and easier to maintain.",
    details:
      "Ideal for homeowners who want a dependable weekly rhythm for skimming, brushing, filter care, and early detection of water quality issues.",
    link: null,
  },
  {
    title: "Water Chemistry and Pool Safety Essentials",
    category: "Education",
    date: "Free resource",
    image: "https://res.cloudinary.com/diwfc48gr/image/upload/v1746662883/chemicalreport_nuzwv9.jpg",
    summary:
      "Learn how pH, alkalinity, calcium hardness, and sanitizer levels affect finish protection, clarity, and swimmer safety.",
    details:
      "Useful for homeowners, property managers, and operators who want to understand the chemistry behind a healthier, more stable pool environment.",
    link: null,
  },
  {
    title: "Residential and Airbnb Pool Care Planning",
    category: "Property Management",
    date: "Free resource",
    image: "/images/aboutus-bg.jpg",
    summary:
      "Helpful guidance for villas, Airbnb properties, and residential communities that need a reliable service rhythm and a consistent care plan.",
    details:
      "Focuses on maintenance planning, guest-ready pool standards, and seasonal service routines that reduce surprises and protect your property investment.",
    link: null,
  },
];

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <SEO
        title="Pool Care Resources | AquaCare Plus Pools"
        description="Access free pool-care guides, startup resources, and educational materials for homeowners, Airbnb hosts, villa operators, and property managers."
        keywords="pool resources, pool care guides, pool startup guide, AquaCare Plus Pools resources, pool chemistry education"
        url="https://www.aquacarepluspoolsja.com/resources"
        image="https://www.aquacarepluspoolsja.com/images/aboutus-bg.jpg"
      />

      <Navbar />
      <div className="pt-20 md:pt-10">
        <Banner title="Resources" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Free Educational Resources
          </p>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Helpful pool-care guidance for every property type
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">
            AquaCare Plus Pools shares practical, free resources designed to help homeowners,
            Airbnb hosts, villa operators, hotels, and residential property managers care for
            their pools with more confidence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={resource.image}
                alt={resource.title}
                className="h-52 w-full object-cover"
              />

              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {resource.category}
                  </span>
                  <span className="text-xs font-medium text-gray-500">{resource.date}</span>
                </div>

                <h2 className="text-xl font-bold text-blue-900">{resource.title}</h2>
                <p className="mt-4 text-sm leading-7 text-gray-600">{resource.summary}</p>
                <p className="mt-3 text-sm leading-6 text-gray-500">{resource.details}</p>

                {resource.link ? (
                  <Link
                    to={resource.link}
                    className="mt-6 inline-flex w-fit items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Read Guide
                  </Link>
                ) : (
                  <span className="mt-6 inline-flex w-fit items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                    Free resource
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary via-primary-300 to-secondbasecolor p-8 text-center text-white shadow-lg">
          <p className="text-2xl font-bold sm:text-3xl">Our team would be happy to assist.</p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/Contact-Us"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-primary transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
