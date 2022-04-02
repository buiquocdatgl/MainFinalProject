import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

import OrderCard from '../../Shared/OrderCard';

function Order(props) {
  const [orderList, setOrderList] = useState();

  const data = props.route.params;

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, []),
  );

  const getOrders = () => {
    axios
      .get('http://192.168.101.9:11000/api/orders')
      .then(x => {
        setOrderList(x.data);
      })
      .catch(error => console.log(error));
  };
  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({item}) => <OrderCard {...item} editMode={true} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default Order;
