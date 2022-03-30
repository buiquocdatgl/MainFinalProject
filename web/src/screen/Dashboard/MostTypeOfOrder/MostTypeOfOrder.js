import React from 'react'
import ChevronDownIcon from "../Sidebar/icons/chevrondown"
import ChartIcon from '../MostOrder/chartIcon'

function MostTypeOfOrder() {
    return (
        <div className="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-12 mt-10">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-loose text-white">Most type of order</h2>
                <button className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700">
                    <ChevronDownIcon />
                    <span className="text-sm text-white">Today</span>
                </button>
            </div>
            <hr className="border-gray-700" />
            <div className="flex gap-x-7">
                <ChartIcon />
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-2 items-start">
                        <div className="w-4 h-4 mt-0.5 rounded-full bg-accent-red" />
                        <div>
                            <div className="text-sm font-medium text-white">Dine in</div>
                            <div className="text-xs text-gray-500">200 customers</div>
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-start">
                        <div className="w-4 h-4 mt-0.5 rounded-full bg-accent-orange" />
                        <div>
                            <div className="text-sm font-medium text-white">To go</div>
                            <div className="text-xs text-gray-500">122 customers</div>
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-start">
                        <div className="w-4 h-4 mt-0.5 rounded-full bg-accent-blue" />
                        <div>
                            <div className="text-sm font-medium text-white">Delivery</div>
                            <div className="text-xs text-gray-500">264 customers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostTypeOfOrder