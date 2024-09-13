// import React, { useState } from 'react';
// import PaymentItem from './PaymentItem';
// import UserDetails from './UserDetails';
// import { CSSTransition } from 'react-transition-group';
// import './PaymentHistory.css';
// import './UserDetails.css'; // Ensure this file is imported for animations

// const payments = [
//   {
//     id: 1,
//     name: 'XYZ Store ID',
//     date: 'June 1, 2023',
//     time: '08:22 AM',
//     amount: '+Rs 5,553',
//     method: 'MasterCard 404',
//     status: 'Completed',
//     details: {
//       id: '#00123521',
//       method: 'MasterCard 404',
//       invoiceDate: 'April 29, 2023',
//       dueDate: 'June 5, 2023',
//       datePaid: 'June 4, 2023',
//     },
//   },
//   {
//     id: 2,
//     name: 'XYdsfaZ Store ID',
//     date: 'Jdfune 1, 2023',
//     time: '08:22 AM',
//     amount: '+Rs 5,553',
//     method: 'MasterCard 404',
//     status: 'Completed',
//     details: {
//       id: '#977155',
//       method: 'MasterCard 404',
//       invoiceDate: 'April 29, 2023',
//       dueDate: 'June 5, 2023',
//       datePaid: 'June 4, 2023',
//     },
    
//   },
  
//   // Add more payment items as needed
// ];

// const PaymentHistory = () => {
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleUserClick = (user) => {
//     setSelectedUser(selectedUser === user ? null : user);
//   };
//   const [active, setActive] = useState("Monthly");

//   const handleClick = (value) => {
//     setActive(value);
//   };
  
//   return (
//     <div className="payment-history ml-3">
//       <h4 className="fs-3 text-black font-bold">Payment History</h4>
//       <p className='font-semibold mt-3 mb-4'>Your Wallet Payment History</p>
//       <div className="button-groupp mb-9">
//             {["Monthly", "Weekly", "Today"].map((value) => (
//               <button
//                 key={value}
//                 className={`button ${active === value ? "active" : ""}`}
//                 onClick={() => handleClick(value)}
//               >
//                 {value}
//               </button>
//             ))}
//           </div>
         
//       <div className="payment-list">
     
//         {payments.map((payment) => (
            
//           <PaymentItem
          
//             key={payment.id}
//             payment={payment}
//             onClick={() => handleUserClick(payment)}
//             isSelected={selectedUser === payment}
            
//           />
          
//         ))}
        
//       </div>
//       <CSSTransition
//         in={!!selectedUser}
//         timeout={300}
//         classNames="user-details-transition"
//         unmountOnExit
//       >
//         <div className="popup">
//           <div className="popup-inner">
        
//             {selectedUser && <UserDetails details={selectedUser.details} />}
//             <button className="close-button" onClick={() => setSelectedUser(null)}>Close</button>
//           </div>
//         </div>
//       </CSSTransition>
//     </div>
//   );
// };

// export default PaymentHistory;
