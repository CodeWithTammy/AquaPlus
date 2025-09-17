import React from "react";
import { useState } from "react";
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


export function PackageComponent({ title, desc, price, options, showSelectButton=false }) {

      const [showForm, setShowForm] = useState(false);

  return (
    
    <Card
  variant="gradient"
  className={`${
    title === "Premium Package"
      ? "bg-primary"
      : title === "Standard Package"
      ? "bg-yellow-500"
      : "bg-white"
  }`}
>
    {/* ✅ Recommendation badge */}
{title === "Standard Package" && (
  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path d="M12 2l2.39 4.85 5.35.78-3.87 3.77.91 5.32L12 14.77l-4.78 2.51.91-5.32L4.26 7.63l5.35-.78L12 2z" />
    </svg>
    Recommended
  </div>
)}

  <CardHeader
    floated={false}
    shadow={false}
    color="transparent"
    className="!m-0 p-6"
  >
    <Typography
      variant="h6"
      color="blue-gray"
      className={`capitalize font-bold mb-1 text-primary ${
        title === "Premium Package"
          ? "text-white"
          : title === "Standard Package"
          ? "text-white"
          : "text-blue-gray-900"
      }`}
    >
      {title}
    </Typography>
    <Typography
      variant="small"
      className={`font-normal ${
        title === "Premium Package"
          ? "text-white"
          : title === "Standard Package"
          ? "text-white"
          : "!text-gray-500"
      }`}
    >
      {desc}
    </Typography>
    <Typography
      variant="h3"
      color="blue-gray"
      className={`!mt-4 flex gap-1 !text-4xl ${
        title === "Premium Package"
          ? "text-secondbasecolor"
          : title === "Standard Package"
          ? "text-yellow-100"
          : "text-blue-600"
      }`}
    >
      {price[0]}
      {price[1]}
      <Typography
        as="span"
        color="blue-gray"
        className={`-translate-y-0.5 self-end opacity-70 text-lg font-bold ${
          title === "Premium Package"
            ? "text-white opacity-100"
            : title === "Standard Package"
            ? "text-white opacity-100"
            : "text-black"
        }`}
      >
        /{price[2]}
      </Typography>
    </Typography>
  </CardHeader>

  <CardBody className="pt-0">
    <ul className="flex flex-col gap-3 mb-6">
      {options.map((option, key) => (
        <li
          key={key}
          className={`flex items-center gap-3 ${
            title === "Premium Package"
              ? "text-white"
              : title === "Standard Package"
              ? "text-white"
              : "text-gray-700"
          }`}
        >
          {option.icon}
          <Typography variant="small" className="font-normal text-inherit">
            {option.info}
          </Typography>
        </li>
      ))}
    </ul>
  </CardBody>

  <div className="flex justify-center mb-4">
    {showSelectButton && (
      <button
        onClick={() => setShowForm(true)}
        className={`${
          title === "Premium Package"
            ? "bg-none border-2 border-white text-white rounded-md w-48 py-2 px-4 hover:bg-secondbasecolor hover:border-transparent"
            : title === "Standard Package"
            ? "bg-none border-2 border-white text-white rounded-md w-48 py-2 px-4 hover:bg-yellow-600 hover:border-transparent"
            : "bg-none border-2 border-blue-500 text-blue-500 rounded-md w-48 py-2 px-4 hover:bg-primary hover:text-white hover:border-transparent"
        }`}
      >
        Select Plan
      </button>
    )}
  </div>

  {showForm && (
    <PricingForm plan={title} onClose={() => setShowForm(false)} />
  )}
</Card>


  );
}
 
//   return (
//     <section className="py-24 m-0">
//       <div className="container mx-auto flex flex-col justify-center items-center ">
//         <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
//           {cards.map(({ title, desc, price, options }, key) => (
//             <PricingCard key={key} title={title} desc={desc} price={price} options={options} />
//           ))}
//         </div>
//         </div>
//     </section>
//   );


export default PackageComponent;
