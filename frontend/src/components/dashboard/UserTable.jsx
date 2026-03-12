// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token");

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Users</h2>

//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="border-b dark:border-gray-700">
//               <th className="text-left p-3">Avatar</th>
//               <th className="text-left p-3">Name</th>
//               <th className="text-left p-3">Email</th>
//               <th className="text-left p-3">Role</th>
//               <th className="text-left p-3">Created</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr
//                 key={user._id}
//                 className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <td className="p-3">
//                   <img
//                     src={
//                       user.avatar ||
//                       "https://ui-avatars.com/api/?name=" + user.name
//                     }
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                 </td>

//                 <td className="p-3">{user.name}</td>
//                 <td className="p-3">{user.email}</td>

//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       user.role === "admin"
//                         ? "bg-red-100 text-red-600"
//                         : "bg-green-100 text-green-600"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   {new Date(user.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {users.length === 0 && (
//           <p className="text-center text-gray-500 mt-4">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserTable;