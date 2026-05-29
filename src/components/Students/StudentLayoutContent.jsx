// "use client";

// import { use } from "react";
// import StudentHeader from "@/components/students/StudentHeader";
// import StudentSidebar from "@/components/students/StudentSidebar";
// import StudentFooter from "@/components/students/StudentFooter";

// export default function StudentLayout({ children, params }) {
//   const { id } = use(params);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <StudentHeader />

//       <div className="flex flex-1 flex-row-reverse">
//         <StudentSidebar id={id} />

//         <main className="flex-1 p-6">{children}</main>
//       </div>

//       <StudentFooter />
//     </div>
//   );
// }