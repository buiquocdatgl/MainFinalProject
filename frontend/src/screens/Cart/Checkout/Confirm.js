import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Button} from 'react-native';
import {Text, Left, Right, ListItem, Thumbnail, Body, List} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import {REACT_APP_API} from '../../../../APIUrl';
import {REACT_APP_API_Image} from '../../../../APIUrl';

import Toast from 'react-native-toast-message';
import axios from 'axios';

var {width, height} = Dimensions.get('window');

const Confirm = (props, navigation) => {
  const finalOrder = props.route.params;
  

  const [productUpdate, setProductUpdate] = useState();


  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate();
    };
  }, [props]);


  const getProducts = x => {
    const order = x.order;
    var products = [];
    if (order) {
      order.orderItems.forEach(cart => {
        axios
          .get(`${REACT_APP_API}/product/${cart.product.id}`)
          .then(data => {
            products.push(data.data);
            setProductUpdate(products);
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  };

  const confirmOrder = () => {
    const order = finalOrder.order;
    const bodyOrderItems = order.orderItems.map(orderItems => {
      const obj = {
        amount: orderItems.amount,
        product: orderItems.product.id,
      };
      return obj;
    });

    Promise.all(bodyOrderItems);

    const body = {
      orderItems: bodyOrderItems,
      room: order.room,
      phone: order.phone,
      returnDate: order.returnDate,
      status: order.status,
      user: props.userProfile._id
    };

    axios
      .post(`${REACT_APP_API}/orders`, body)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Confirm Your Order Successfully',
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('CheckInfo', res.data);
          }, 500);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{borderWidth: 1, borderColor: 'orange'}}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{padding: 8}}>
              <Text>Room: {finalOrder.order.room}</Text>
              <Text>Phone: {finalOrder.order.phone}</Text>
              <Text>name: {props.userProfile.name}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {productUpdate && (
              <List
                dataArray={productUpdate}
                renderRow={x => (
                  <ListItem style={styles.listItem} key={x.id} avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `${REACT_APP_API_Image}` + x.imageLink,
                        }}
                      />
                    </Left>
                    <Body style={styles.body}>
                      <Left>
                        <Text>{x.name}</Text>
                      </Left>
                      <Right>
                        <Text>{x.description}</Text>
                      </Right>
                    </Body>
                  </ListItem>
                )}></List>
            )}
          </View>
        ) : null}
        <View style={{alignItems: 'center', margin: 20}}>
          <Button title={'Place order'} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems, userProfile } = state;
  return {
    cartItems: cartItems,
    userProfile: userProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height / 1.8,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
    marginTop: 100,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
    marginTop: 15,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
