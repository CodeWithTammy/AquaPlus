import React from 'react'
import { motion as Motion } from "framer-motion";


const TeamSection = () => {
  return (
    <div className='w-full h-full'>
      <Motion.div
  initial={{ opacity: 0, y: 50 }}   // start hidden & moved down
  whileInView={{ opacity: 1, y: 0 }} // animate only when visible
  transition={{ duration: 0.6 }}
  viewport={{ once: true, amount: 0.3 }} // once=true means animate only first time
>
        <section className="text-center py-16 bg-white">
  {/* Section Header */}
  <p className="text-secondbasecolor font-semibold mt-20">
    <span className="inline-block w-1 h-3 bg-secondbasecolor"></span> Team Members
  </p>
  <h2 className="text-4xl font-bold text-primary mb-12">
    Our Professional Experts
  </h2>

  {/* Team Grid */}

  <div className="justify-center flex flex-cols-1 md:flex-cols-2 lg:flex-cols-4 gap-20 px-4 md:px-16">
    {/* Member Card */}
    {[
      {
        name: "Tyreece Morris",
        role: " CEO/Project Manager",
        img: "/images/john doe.jpg",
      },
      {
        name: "Javan Thompson",
        role: "COO/Technician",
        img: "/images/john doe.jpg",
      },
      {
        name: "Bridgette Morris",
        role: "Secretary",
        img: "/images/john doe.jpg",
      },
      
    ].map((member, index) => (
      <div key={index} className="flex flex-col justify-center items-center">
        <img
          src={member.img}
          alt={member.name}
          className="rounded-full w-64 h-64 object-cover shadow-md"
        />
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {member.name}
        </h3>
        <p className="text-blue-600 text-sm mt-1">{member.role}</p>
      </div>
    ))}
 
  </div>
</section>
</Motion.div>
    </div>
  )
}

export default TeamSection



// import React from 'react';
// import { motion as Motion } from "framer-motion";
// import { FaUserCircle } from "react-icons/fa"; // ✅ User icon

// const TeamSection = () => {
//   const teamTree = {
//     name: "Tyreece Morris",
//     role: "CEO / Project Manager",
//     children: [
//       {
//         name: "Javan Thompson",
//         role: "COO / Technician",
//       },
//       {
//         name: "Bridgette Morris",
//         role: "Secretary",
//         children: [],
//       },
//     ],
//   };

//   const renderTree = (node, level = 0) => {
//     // Gradient colors based on level
//     const colors = [
//       "from-blue-500 to-blue-500",
//       "from-red to-red",
//       "from-green-400 to-teal-400",
//       "from-yellow-400 to-orange-400",
//     ];
//     const gradient = colors[level % colors.length];

//     return (
//       <Motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         className="flex flex-col items-center mt-8 relative"
//       >
//         {/* Large user icon ABOVE card */}
//         <FaUserCircle className="w-20 h-20 text-gray-400 mb-4" /> 

//         {/* Modern Card */}
//         <div
//           className={`p-6 min-w-[200px] rounded-2xl shadow-xl text-white bg-gradient-to-r ${gradient} text-center transform hover:scale-105 transition-transform`}
//         >
//           <h3 className="text-lg font-bold">{node.name}</h3>
//           <p className="text-sm mt-1">{node.role}</p>
//         </div>

//         {/* Children */}
//         {node.children && node.children.length > 0 && (
//           <div className="flex mt-10 space-x-10">
//             {node.children.map((child, idx) => (
//               <div key={idx} className="flex flex-col items-center relative">
//                 {/* Vertical connector */}
//                 <div className="absolute top-0 left-1/2 h-5 border-l-2 border-gray-300"></div>
//                 {/* Horizontal connector */}
//                 <div className="absolute top-5 left-0 w-full border-t-2 border-gray-300 -z-10"></div>
//                 {renderTree(child, level + 1)}
//               </div>
//             ))}
//           </div>
//         )}
//       </Motion.div>
//     );
//   };

//   return (
//     <div className="w-full h-full bg-white py-16">
//       <Motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <section className="text-center px-4">
//           <p className="text-blue-400 font-semibold mb-2">
//             <span className="inline-block w-1 h-3 bg-blue-400 mr-2"></span> Team Members
//           </p>
//           <h2 className="text-4xl font-bold text-primary mb-12">
//             Our Professional Experts
//           </h2>

//           {/* Tree */}
//           <div className="flex justify-center">
//             {renderTree(teamTree)}
//           </div>
//         </section>
//       </Motion.div>
//     </div>
//   );
// };

// export default TeamSection;
