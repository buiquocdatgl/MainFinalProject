import React, { useState, useEffect } from 'react';
import ChevronDownIcon from "../Sidebar/icons/chevrondown";
import {
    getProduct,
} from "../../../apiServices/index";

function MostOrder() {

    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const { data, status } = await getProduct();
        if (status === 200) {
            setProducts((prev) => data);
        }
    };

    useEffect(() => {
        fetchData();
        document.title = "Product";
    }, []);

    return (
        <div className="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-loose text-white">Most Ordered</h2>
                <button className="flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700">
                    <ChevronDownIcon />
                    <span className="text-sm text-white">Today</span>
                </button>
            </div>
            <hr className="border-gray-700" />
            <div className="flex flex-col gap-y-4">
                {products.map((item) => (
                    <div
                        className="flex gap-x-4 items-center"
                        key={item.name}
                    >
                        <img className="w-14 h-14" src={`http://localhost:12000${item.imageLink}`} alt="" />
                        <div className="flex flex-col gap-y-0.5">
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="py-3.5 rounded-lg w-full border border-primary text-primary text-sm font-semibold"
            >
                View all
            </button>
        </div>
    )
}

export default MostOrder