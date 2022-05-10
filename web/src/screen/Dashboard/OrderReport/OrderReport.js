import React, { useEffect, useState } from "react";
import OptionsIcon from "../Sidebar/icons/option";
import {getUser} from "../../../apiServices/index";

function OrderReport() {

  const [users, setUsers] = useState([]);
  const orders = [
    {
      avatar: "avatar-1.png",
      name: "Thanh Thien",
      email: "thanhthien@gmail.com",
      firstname: "Thien",
      role: "student",
    },
    {
      avatar: "avatar-2.png",
      name: "Minh Tri",
      email: "minhtri@gmail.com",
      firstname: "Tri",
      role: "staff",
    },
    {
      avatar: "avatar-3.png",
      name: "Tan Khoa",
      email: "tankhoa@gmail.com",
      firstname: "Khoa",
      role: "security",
    },
    {
      avatar: "avatar-3.png",
      name: "Xuan Nghia",
      email: "xuannghia@gmail.com",
      firstname: "Nghia",
      role: "student",
    },
  ];

  const fetchDataUser = async () => {
    const { data, status } = await getUser();
    if (status === 200) {
      setUsers((prev) => data);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <div className="p-6 bg-gray-900 rounded-lg h-4/6">
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-xl font-semibold leading-loose text-white">Order Report</h2>
        <button className="flex py-3 px-4 rounded-lg border border-gray-700 gap-x-2.5">
          <OptionsIcon />
          <span className="text-sm text-white">Filter order</span>
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold text-white">
            <td className="py-4 border-b border-gray-700">User</td>
            <td className="py-4 border-b border-gray-700">Email</td>
            <td className="py-4 border-b border-gray-700 text-right">First Name</td>
            <td className="py-4 border-b border-gray-700 text-center">Role</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr className="text-sm text-gray-500" key={item.name}>
              <td className="py-4">
                <div className="flex gap-4 items-center">
                  <img width="32" src={`${item.avatar}`} alt="" />
                  <span> {item.lastname} </span>
                </div>
              </td>
              <td className="py-4">{item.email}</td>
              <td className="py-4 tabular-nums text-right">{item.firstname}</td>
              <td className="py-4 flex justify-center">
                <span
                  className={
                    item.role === 'ADMIN' ? 'flex justify-center py-1 w-24 font-medium capitalize rounded-full bg-accent-green/20 text-accent-green'
                    : 'flex justify-center py-1 w-24 font-medium capitalize rounded-full bg-accent-purple/20 text-accent-purple'
                  }
                >
                  {item.role}
                </span>
              </td>
            </tr>
          ))}
          {/* {orders.map((item) => (
            <tr className="text-sm text-gray-500" key={item.name}>
              <td className="py-4">
                <div className="flex gap-4 items-center">
                  <img width="32" src={`/img/${item.avatar}`} alt="" />
                  <span> {item.name} </span>
                </div>
              </td>
              <td className="py-4">{item.email}</td>
              <td className="py-4 tabular-nums text-right">{item.firstname}</td>
              <td className="py-4 flex justify-center">
                <span
                  className={
                    'flex justify-center py-1 w-24 font-medium capitalize rounded-full bg-accent-purple/20 text-accent-purple'
                  }
                >
                  {item.role}
                </span>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  )
}

export default OrderReport