/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Text,
  Left,
  Right,
  H1,
  ListItem,
  Thumbnail,
  Body,
} from 'native-base';
import {COLORS, SIZES, icons} from '../../constants/index';
import {SwipeListView} from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import CartQuantityButton from '../../component/CartQuantityButton';
import Header from '../../component/Header';
import IconButton from '../../component/IconButton';
import {REACT_APP_API} from '../../../APIUrl'
import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

const MyCart = props => {
  const [productUpdate, setProductUpdate] = useState();

  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
    };
  }, [props]);

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach(cart => {
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
  };

  function renderHeader() {
    return (
      <Header
        title="MY CART"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 50,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray,
              marginTop: 4,
              marginLeft: 20,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
            onPress={() => props.navigation.goBack()}
          />
        }
        rightComponent={
          <CartQuantityButton
            containerStyle={{
              marginTop: 4,
              marginRight: 20,
            }}
          />
        }
      />
    );
  }

  return (
    <>
      {renderHeader()}
      {productUpdate ? (
        <Container>
          <SwipeListView
            data={productUpdate}
            renderItem={data => <CartItem item={data} />}
            renderHiddenItem={data => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item.id)}>
                  <Icon name="trash" color={'white'} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Right style={{marginLeft: 150}}>
              <EasyButton danger medium onPress={() => props.clearCart()}>
                <Text style={{color: 'white'}}>Clear</Text>
              </EasyButton>
            </Right>
            <Right>
              <EasyButton
                primary
                medium
                onPress={() => props.navigation.navigate('Checkout')}>
                <Text style={{color: 'white'}}>Checkout</Text>
              </EasyButton>
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const {cartItems} = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: item => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 37,
    marginRight: 35
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
