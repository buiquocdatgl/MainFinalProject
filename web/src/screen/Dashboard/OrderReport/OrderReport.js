import React from 'react'
import OptionsIcon from "../Sidebar/icons/option";

function OrderReport() {
  const orders = [
    {
      avatar: "avatar-1.png",
      name: "Eren Jaegar",
      menu: "Spicy seasoned seafood noodles",
      total: "$125",
      status: "completed",
    },
    {
      avatar: "avatar-2.png",
      name: "Reiner Braunn",
      menu: "Salted Pasta with mushroom sauce",
      total: "$145",
      status: "preparing",
    },
    {
      avatar: "avatar-3.png",
      name: "Levi Ackerman",
      menu: "Beef dumpling in hot and sour soup",
      total: "$105",
      status: "completed",
    },
    {
      avatar: "avatar-4.png",
      name: "Historia Reiss",
      menu: "Hot spicy fried rice with omelet",
      total: "$45",
      status: "preparing",
    },
    {
      avatar: "avatar-5.png",
      name: "Armin Arlert",
      menu: "Spicy seasoned seafood noodles",
      total: "$125",
      status: "completed",
    },
    {
      avatar: "avatar-6.png",
      name: "Hanji Zoe",
      menu: "Hot spicy fried rice with omelet",
      total: "$245",
      status: "preparing",
    },
  ];
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
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
            <td className="py-4 border-b border-gray-700">Customer</td>
            <td className="py-4 border-b border-gray-700">Menu</td>
            <td className="py-4 border-b border-gray-700 text-right">Total Payment</td>
            <td className="py-4 border-b border-gray-700 text-center">Status</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr className="text-sm text-gray-500" key={item.name}>
              <td className="py-4">
                <div className="flex gap-4 items-center">
                  <img width="32" src={`/img/${item.avatar}`} alt="" />
                  <span> {item.name} </span>
                </div>
              </td>
              <td className="py-4">{item.menu}</td>
              <td className="py-4 tabular-nums text-right">{item.total}</td>
              <td className="py-4 flex justify-center">
                <span
                  className={
                    item.status === 'completed' ? 'flex justify-center py-1 w-24 font-medium capitalize rounded-full bg-accent-green/20 text-accent-green'
                    : 'flex justify-center py-1 w-24 font-medium capitalize rounded-full bg-accent-purple/20 text-accent-purple'
                  }
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderReport