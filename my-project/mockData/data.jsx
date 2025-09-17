
import { Children } from "react";

export const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About Us",
    link: "/AboutUs",
  },
  {
    id: 3,
    title: "Services",
    link: "/Services",
    dropdown: true,
    children:[
      {
        id: 1,
        title: "Customized Maintenance",
        link: "/Services/Customized-Maintenance",
      },
      {
        id: 2,
        title: "Pool Consultation ",
        link: "/Services/Pool-Consultation",
      },
      {
        id: 3,
        title: "Renovations and Repairs",
        link: "/Services/Renovations-and-Repairs",
      },
      {
        id: 4,
        title: "Pool Construction",
        link: "/Services/Pool-Construction",
        
      },
      {
        id: 5,
        title: "Commercial Pool Management",
        link: "/Services/Commercial-Pool-Management",

      },
      {
        id: 6,
        title: "Pool Inspection and Reports",
        link: "/Services/Pool-Inspection-and-Reports",
        
   
      }
    ]
  },
    {
  id:4,
  title: "Packages",
  link: "/Pricing",
  },
  {
    id: 5,
    title: "Rentals",
    link: "/Rentals",
  },
  {
    id: 6,
    title: "Products",
    link: "/Products",
  },
  {
    id: 7,
    title: "Contact",
    link: "/Contact-Us",
  },
];

