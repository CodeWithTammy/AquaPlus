import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const PackagesData = [
  {
    title: "Starter Package",
    desc: "Per month: 100% Maintenance Guarantee",
    price: ["JMD$", "25,000", "mo"], // Updated price
    note: "Prices before toll per month",
    options: [
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Weekly Routined Cleaning" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Delivery and Administration of Chemicals" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Evaluation of Equipment and Filtration Systems" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "24-hr WhatsApp Customer Support" },
    ],
  },
  {
    title: "Standard Package",
    desc: "Per month: Twice weekly maintenance. Ideal for residential commercial pools with moderate use.",
    price: ["JMD$", "52,200", "mo"], // Updated price
    note: "Prices before toll per month",
    options: [
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Delivery and Administration of Chemicals" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Evaluation of Equipment and Filtration Systems" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Twice Weekly Routined Cleaning" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Minor Repairs (On-Spot Fixes)" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Backwashing/rinsing filters" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Upkeep of the surrounding areas." },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Priority Customer Support" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Access to consultation discount" },
    ],
  },
  {
    title: "Premium Package",
    desc: "Per month: Full pool service, Ideal for Luxury/High traffic pools",
    price: ["", "Enterprise", ""], // Enterprise
    note: "Contact us for pricing",
    options: [
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Customized Maintenance Plan" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Automated Maintenance Tools" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Deep Clean every quarter" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Routine Inspection and Evaluation of pool" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Routined Power-Washing of deck" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Cleaning of changing rooms and restroom areas" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Assessment and recommendation for renovations and repairs" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Custom Chemical Dosing Plan" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Capital repairs and budget planning" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Emergency Support (Same day)" },
      { icon: <CheckCircleIcon className="h-5 w-5 text-blue-gray-900" />, info: "Includes Standard Package" },
    ],
    contactUs: true, // flag to show "Contact Us" instead of Select Plan
  },
];

// Optional alternate pricing for St. Ann's & Ocho Rios
export const AlternatePackagesData = [
  {
    title: "Starter Package",
    desc: "Per month: 100% Maintenance Guarantee",
    price: ["JMD$", "36,000", "mo"],
    note: "Prices before toll per month",
    options: PackagesData[0].options,
  },
  {
    title: "Standard Package",
    desc: "Per month: Twice weekly maintenance.\nIdeal for residential commercial pools with moderate use.",
    price: ["JMD$", "74,200", "mo"],
    note: "Prices before toll per month",
    options: PackagesData[1].options,
  },
  {
    title: "Premium Package",
    desc: "Per month: Full pool service, Ideal for Luxury/High traffic pools",
    price: ["", "Enterprise", ""],
    note: "Contact us for pricing",
    options: PackagesData[2]?.options || [],
    contactUs: true,
  },
];