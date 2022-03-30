import CoinIcon from "../Sidebar/icons/coin";
import OrderIcon from "../Sidebar/icons/order";
import CustomerIcon from "../Sidebar/icons/customer";


const stats = [
    {
        title: "Total Revenue",
        percentage: "+32.40%",
        value: "4",
        status: "up",
        icon: <CoinIcon />,
    },
    {
        title: "Total Dish Ordered",
        percentage: "-12.40%",
        value: "12",
        status: "down",
        icon: <OrderIcon />,
    },
    {
        title: "Total Customer",
        percentage: "+2.40%",
        value: "26",
        status: "up",
        icon: <CustomerIcon />,
    },
];

export default stats;