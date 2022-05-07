import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import EasyButton from './StyledComponents/EasyButton';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {REACT_APP_API} from '../../APIUrl';

const codes = [
  {name: 'pending', code: '3'},
  {name: 'delivered', code: '2'},
];

const OrderCard = props => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState('3');
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState('#E74C3C');

  useEffect(() => {
    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText('pending');
      setCardColor('#E74C3C');
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText('delivered');
      setCardColor('#2ECC71');
    }
    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const order = {
      orderItems: props.orderItems,
      room: props.room,
      phone: props.phone,
      returnDate: props.returnDate,
      status: statusChange,
    };
    

    axios
      .put(`${REACT_APP_API}/orders/${props.id}`, order)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order Edited',
            text2: 'Approve User Rent Material',
          });
          // setTimeout(() => {
          //   props.navigation.navigate('Order');
          // }, 500);
          if(statusChange === '3'){
            setCardColor('#E74C3C');
            setOrderStatus(<TrafficLight unavailable></TrafficLight>);

          }
          else{
            setCardColor('#2ECC71');
            setOrderStatus(<TrafficLight available></TrafficLight>);

          }
        }
      })
      
      .catch(error => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <View style={[{backgroundColor: cardColor}, styles.container]}>
      <View style={styles.container1}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text>
          Status: {statusText} {orderStatus}
        </Text>
        <Text>
          Phone: {props.phone} {props.shippingAddress2}
        </Text>
        <Text>Room: {props.room}</Text>
        <Text>Date Ordered: {props.dateOrdered.split('T')[0]}</Text>
        <Text>Return Ordered: {props.returnDate.split('T')[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Total Rent: </Text>
          <Text style={styles.price}>{props.totalProduct}</Text>
        </View>
        <View>
          <Picker
            mode="dropdown"
            iosIcon={<Icon color={'#007aff'} name="arrow-down" />}
            style={{width: undefined}}
            selectedValue={statusChange}
            placeholder="Change Status"
            placeholderIconColor={{color: '#007aff'}}
            onValueChange={e => setStatusChange(e)}
            >
            {codes.map(c => {
              return <Picker.Item key={c.code} label={c.name} value={c.code} />;
            })}
          </Picker>
          <EasyButton secondary large onPress={() => updateOrder()}>
            <Text style={{color: 'white'}}>Update</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  container1: {
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrderCard;
