import React, { useState } from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {REACT_APP_API_Image} from '../../../APIUrl'

const CartItem = (props) => {
  const data = props.item.item;

  return (
    <View style={styles.container}>
      <View style={styles.orderItem}>
        <Image 
          style={styles.image} 
          source={{
            uri: `${REACT_APP_API_Image}` + data.imageLink,
          }}
        />
        <View>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.desc}>{data.description}</Text>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#374151',
    marginTop: 35,
    width: 350,
    marginLeft: 32
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
    color: '#FCD34D',
  },
});


export default CartItem;
