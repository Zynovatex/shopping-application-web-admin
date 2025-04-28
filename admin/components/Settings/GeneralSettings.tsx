const GeneralSettings = () => {
  return (
    <div className=''>GeneralSettings</div>
  )
}

export default GeneralSettings

// "use client";
// import { useState } from "react";

// const [companyLogo, setCompanyLogo] = useState(null);
// const [heroImage, setHeroImage] = useState(null);


// const GeneralSettings = () => {
//   const [companyLogo, setCompanyLogo] = useState(null);
//   const [heroImage, setHeroImage] = useState(null);
//   const [companyName, setCompanyName] = useState("");
//   const [companyDescription, setCompanyDescription] = useState("");
//   const [theme, setTheme] = useState("light");

//   // Handle Logo Upload
// const handleLogoUpload = (e) => {
//   const file = e.target.files[0]; // Get the selected file
//   if (file) {
//     setCompanyLogo(URL.createObjectURL(file)); // Set the logo preview
//   }
// };

// // Handle Hero Image Upload
// const handleHeroImageUpload = (e) => {
//   const file = e.target.files[0]; // Get the selected file
//   if (file) {
//     setHeroImage(URL.createObjectURL(file)); // Set the hero image preview
//   }
// };


//   return (
//     <div className="space-y-6">
//       {/* Company Info Section */}
//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold">Company Info</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Company Name</label>
//             <input
//               type="text"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter company name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Company Description</label>
//             <textarea
//               value={companyDescription}
//               onChange={(e) => setCompanyDescription(e.target.value)}
//               className="mt-1 p-2 w-full border rounded-md"
//               placeholder="Enter company description"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Company Logo Section */}
//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold">Company Logo</h2>
//         <div>
//           <input
//             type="file"
//             onChange={handleLogoUpload}
//             accept="image/*"
//             className="block mt-1"
//           />
//           {companyLogo && (
//             <img
//               src={companyLogo}
//               alt="Company Logo"
//               className="mt-2 w-32 h-32 object-cover border border-gray-300 rounded-md"
//             />
//           )}
//         </div>
//       </div>

//       {/* Hero Image Section */}
//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold">Hero Section Image</h2>
//         <div>
//           <input
//             type="file"
//             onChange={handleHeroImageUpload}
//             accept="image/*"
//             className="block mt-1"
//           />
//           {heroImage && (
//             <img
//               src={heroImage}
//               alt="Hero Image"
//               className="mt-2 w-full h-[200px] object-cover border border-gray-300 rounded-md"
//             />
//           )}
//         </div>
//       </div>

//       {/* Website Theme Section */}
//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold">Website Theme</h2>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Select Theme</label>
//           <select
//             value={theme}
//             onChange={(e) => setTheme(e.target.value)}
//             className="mt-1 p-2 w-full border rounded-md"
//           >
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end mt-6">
//         <button
//           className="px-6 py-2 bg-[#5A31F5] text-white rounded-md"
//           onClick={() => alert('Settings Saved!')}
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GeneralSettings;
