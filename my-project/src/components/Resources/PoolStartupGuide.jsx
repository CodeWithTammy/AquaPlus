import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";
import Banner from "../ReuseableComponents/BannerSection";
import SEO from "../SEO";

const PoolStartupGuide = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <SEO
        title="The First 28 Days Done Right | AquaCare Plus Pools"
        description="A step-by-step guide to curing a newly plastered, quartz, or pebble pool surface properly during the first 28 days."
        keywords="pool startup guide, new pool curing, pool plaster care, POOL startup protocol, pool chemistry guide"
        url="https://www.aquacarepluspoolsja.com/resources/pool-startup-guide"
        image="https://www.aquacarepluspoolsja.com/images/aboutus-bg.jpg"
      />

      <Navbar />
      <div className="pt-20 md:pt-10">
        <Banner title="Pool Startup Guide" />
      </div>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-blue-900">
          <div className="mb-8 overflow-hidden rounded-3xl border border-blue-100 shadow-sm">
            <img
              src="https://res.cloudinary.com/diwfc48gr/image/upload/v1772324232/pool_repairs_and_restoration_xjgtkj.png"
              alt="Newly finished pool surface and waterline detail"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Free resource
          </p>

          <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            The First 28 Days Done Right = 10+ Years of Zero Stress: Your Make-or-Break Pool Startup Guide
          </h1>

          <p className="mt-6 text-lg leading-8">
            You just invested serious capital into a stunning new pool surface, but the most critical
            phase of its entire lifespan begins the second the water turns on.
          </p>

          <p className="mt-4 text-lg leading-8">
            Whether you are a homeowner admiring a brand-new backyard oasis in Red Hills, a property
            manager overseeing a newly built apartment complex in Kingston, or a hotelier launching a
            luxury resort upgrade, your pool&apos;s interior finish is extremely vulnerable right now.
            Fresh plaster, quartz, and pebble finishes actually cure underwater. During this hydration
            process, the surface is highly susceptible to staining, scaling, and irreversible structural
            weakness if the water chemistry and physical care are neglected.
          </p>

          <p className="mt-4 text-lg leading-8">
            This 28-day curing window dictates the future of your investment. Get it right, and you are
            looking at a decade or more of a flawless, low-maintenance finish. Get it wrong, and you could
            be facing costly resurfacing long before you ever expected.
          </p>

          <p className="mt-4 text-lg leading-8">
            The following protocol is based strictly on the industry-standard guidelines established by the
            <strong> National Plasterers Council (NPC)</strong>. We use these methods at AquaCare Plus Pools
            to help newly surfaced pools cure properly.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl">The 28-Day Action Plan</h2>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-900">Day 1: The Fill and First Defense</h3>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Fill Without Stopping</h4>
              <p>
                Once the hose is turned on, do not turn off the water until it reaches the middle of the
                skimmer. Stopping prematurely will leave a permanent waterline ring on the fresh plaster.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Circulate Immediately</h4>
              <p>
                Turn on the filtration system as soon as the pool is full and leave it running 24/7 for the
                first week to filter out plaster dust.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Prevent Stains</h4>
              <p>
                Add a high-quality sequestering (metal control) agent immediately to help prevent metals in
                the fill water from staining the fresh finish.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-blue-900">Days 2–3: Brushing and Baseline Chemistry</h3>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Brush Twice Daily</h4>
              <p>
                Using a nylon pool brush, never a wire brush, brush the entire surface—including walls,
                floors, steps, and benches—twice a day. This sweeps away plaster dust and helps prevent it
                from hardening onto the surface.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Test and Adjust</h4>
              <p>
                Test the water&apos;s pH, Total Alkalinity, and Calcium Hardness. The goal is to prevent the
                water from becoming too aggressive, which can etch the plaster, or too scale-forming, which
                can create rough spots.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Hold the Chlorine</h4>
              <p>
                Do not add standard sanitizers or shock treatments just yet. The focus at this stage is on
                water balance and clearing dust. This instruction should be presented as part of the supplied
                startup protocol, not as universal advice for every pool type or circumstance.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-blue-900">Days 4–28: Stabilization and Patience</h3>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Introduce Sanitizer Safely</h4>
              <p>
                Begin adding chlorine slowly according to the applicable startup instructions. Avoid shocking
                the pool during the first month, as extreme chemical spikes can bleach or damage the curing
                finish.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Keep Brushing</h4>
              <p>
                Continue brushing at least once a day, or twice if plaster dust is still visible on the floor.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">Manual Vacuum Only</h4>
              <p>
                Never put a wheeled automatic pool cleaner in the water during the first 28 days according to
                this guide. The wheels may track and scar the soft plaster. If debris must be removed, use a
                brush-head manual vacuum.
              </p>

              <h4 className="mt-4 text-lg font-bold text-gray-800">No Salt, No Heat</h4>
              <p>
                If you have a saltwater chlorinator, do not add salt for a full 30 days according to this
                guide. Likewise, keep the pool heater turned off for the first three weeks to help prevent
                scale from forming on the heat exchanger.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-blue-900">Reference and Best Practices</h2>
            <p className="mt-4">
              The supplied procedure references startup guidelines published by the
              <strong> National Plasterers Council (NPC)</strong>. Maintaining appropriate Langelier
              Saturation Index (LSI) balance and following applicable brushing and chemical protocols can
              help protect the longevity and structural integrity of a pool surface.
            </p>
            <p className="mt-4">
              Do not fabricate citations, quote specific NPC publications that have not been verified, or
              guarantee warranty compliance. If appropriate, include a note recommending that pool owners
              follow their finish manufacturer&apos;s instructions and consult a qualified pool professional.
            </p>
          </section>

          <section className="mt-12 rounded-3xl bg-gradient-to-r from-primary via-primary-300 to-secondbasecolor p-8 text-white shadow-lg">
            <p className="text-lg font-semibold leading-8 text-white">
              &ldquo;If you&apos;d like for our trained team to handle this for you, contact us today. A member of
              our team will respond to you within 15 minutes.&rdquo;
            </p>
            <div className="mt-6">
              <Link
                to="/Contact-Us"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-primary transition duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                Contact Us
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PoolStartupGuide;
