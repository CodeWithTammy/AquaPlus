
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
        title: "Pool Vacuuming",
        link: "#",
      },
      {
        id: 2,
        title: "Brushing of Pool Tiles & Floors",
        link: "#",
      },
      {
        id: 3,
        title: "Backwashing and Rinsing Filters",
        link: "#",
      },
      {
        id: 4,
        title: "Water Chemistry Testing & Balancing",
        link: "#",
        
      },
      {
        id: 5,
        title: "Application of Essential Chemicals",
        link: "#",
    
      },
      {
        id: 6,
        title: "Algaecide Treatment",
        link: "#",
        
   
      },
      {
        id: 7,
        title: "Detailed Inspection & Water Chemical Reports",
        link: "#",
      },
      {
        id: 8,
        title: "Professional Facility Inspection",
        link: "#",
      },
      {
        id: 9,
        title: "Ongoing Maintenance and Cleaning",
        link: "#",
      },
    ]
  },
    {
  id:4,
  title: "Pricing",
  link: "#",
  },
  {
    id: 5,
    title: "Rentals",
    link: "/Rentals",
  },
  {
    id: 6,
    title: "Contact",
    link: "/Contact-Us",
  },
];

