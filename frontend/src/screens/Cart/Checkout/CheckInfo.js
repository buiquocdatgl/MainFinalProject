import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native'
import axios from 'axios';

import { connect } from "react-redux";

const CheckInfo = (props) => {

    const data = props.route.params
    const [order, setOrder] = useState();

    console.log(data);

    // useEffect(() => {
    //     getOrder();
    //     return () => {
    //         setOrder();
    //     };
    //   }, [props]);

    // const getOrder = () => {
    //       axios
    //         .get('http://192.168.101.9:11000/api/orders/' + data.result._id)
    //         .then(data => {
    //             setOrder(data);
    //         })
    //         .catch(e => {
    //           console.log(e);
    //         });
    // };
    console.log(order);

  return (
      
    <Text>CheckInfo</Text>
  )
}

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(CheckInfo);