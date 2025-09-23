import React from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import PricingForm from "../ReuseableComponents/PricingForm";
import { PackagesData } from '../../../mockData/packagesdata';
import PackageComponent from "../ReuseableComponents/PackageComponent";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";



export function PricingSection() {

  return (
    <section className="py-24 m-0">
      <Motion.div
  initial={{ opacity: 0, y: 50 }}   // start hidden & moved down
  whileInView={{ opacity: 1, y: 0 }} // animate only when visible
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
>
      <div className="container mx-auto flex flex-col justify-center items-center ">
        <Typography color="blue-gray" className="mb-4 font-bold text-lg text-blue-600">
          Pricing Plans
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-4 !leading-snug lg:!text-4xl !text-2xl max-w-2xl text-center text-primary">
          Invest in a plan that keeps your pool ever sparkling.
        </Typography>
        <Typography variant="lead" className="mb-10 font-normal !text-gray-500 max-w-xl text-center">
          Compare our pool service plans to find the best fit for your needs and budget. We stand behind our work with a 100% satisfaction guarantee.
        </Typography>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {PackagesData.map(({ title, desc, price, options }, key) => (
            <PackageComponent key={key} title={title} desc={desc} price={price} options={options} showSelectButton= {false} />
          ))}
        </div>
        <Typography variant="small" className="mt-10 font-normal !text-gray-500">
          100% Maintenance Money Back Guarantee if you’re unsatisfied. 
        </Typography>
      </div>
      {/* CTA Section */}
      <section className="bg-primary text-white py-16 mt-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">Choose a plan today and unlock premium features.</p>
        <Link to="/Pricing">
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started Now
          </button>
        </Link>
      </section>
      </Motion.div>
    </section>
  );
}

export default PricingSection;
