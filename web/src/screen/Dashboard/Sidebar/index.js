import React from 'react'
import StoreIcon from "./icons/store"
import data from './data'


function index({ active, handleChecked}){
    return (
        <div className="flex flex-col gap-y-4 items-center py-8 w-24 bg-gray-900">
            <button className="p-2 bg-opacity-20 rounded-xl bg-primary">
                <StoreIcon />
            </button>
            <div className="flex flex-col gap-y-4 items-end self-end">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className={
                            item.id === active
                            ? "bg-gray-800 rounded-l-xl relative before:absolute before:w-4 before:h-8 before:-top-8 before:rounded-br-xl before:right-0 before:shadow-inverse-top  after:absolute after:w-4 after:h-8 after:-bottom-8 after:rounded-tr-xl after:right-0 after:shadow-inverse-bottom" 
                            : ""
                        }
                    >
                        <button
                            onClick={() => handleChecked(item.id)}
                            className={item.id === active ? "p-4 my-4 mr-4 ml-3 rounded-xl text-white shadow-primary bg-primary" : "p-4 my-4 mr-4 ml-3 rounded-xl text-primary"}
                        >
                            {item.icon}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default index