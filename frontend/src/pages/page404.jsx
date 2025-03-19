// import React from 'react'
// import page404 from '../assets/page404.jpg'
// function PageNotFound() {
//   return (
//     <div>
//         <img src={page404} alt="Page not found" />
      
//     </div>
//   )
// }

// export default PageNotFound


// import React from 'react';
// import page404 from '../assets/page404.jpg';

// function PageNotFound() {
//   return (
//     <>

//     <div className="flex justify-center items-center h-screen">
//       <img src={page404} alt="Page not found" className="w-5xl " />
//           <div className=" text-center  px-6 py-2 bg-sky-900 text-white rounded-lg">
//           Back to Home
//         </div>
//     </div>
//     </>
//   );
// }

// export default PageNotFound;


import React from 'react';
import page404 from '../assets/page404.jpg';

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <img src={page404} alt="Page not found" className="w-5xl" />
      <div className="text-center px-6 py-2 bg-sky-900 text-white rounded-lg cursor-pointer">
        Back to Home
      </div>
    </div>
  );
}

export default PageNotFound;
