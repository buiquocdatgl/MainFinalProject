import React, {useState, useCallback} from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {REACT_APP_API} from '../../../APIUrl';

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
      .get(`${REACT_APP_API}/orders`)
      .then(x => {
        setOrderList(x.data);
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={{
      flex: 1,
      flexDirection: "column",
    }}>
      <FlatList
        data={orderList}
        renderItem={({item}) => <OrderCard {...item} editMode={true} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default Order;
