import React from 'react'
import cardData from './cardData'
import ArrowUpIcon from "../Sidebar/icons/arrowup";

function Card() {
    return (
        <div className="flex gap-6">
            {cardData.map((item) => (
                <div
                    className="flex flex-col p-4 w-1/3 bg-gray-900 rounded-lg gap-y-3"
                    key={item.title}
                >
                    <div className="flex items-center gap-x-3">
                        <div className="flex gap-x-4 items-center">
                            <img className="w-14 h-14" src='/img/home1.png' alt="" />
                            <div className="flex flex-col gap-y-0.5">
                                <div className="text-3xl font-medium text-white">Table</div>
                                <div className="text-xs text-gray-500 ml-2">Help student study easily</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-3xl font-semibold text-white">{item.value}</div>
                    <div className="text-sm tracking-wide text-gray-500">{item.title}</div>
                </div>
            ))}
        </div>
    )
}

export default Card