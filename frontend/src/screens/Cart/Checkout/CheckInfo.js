import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {Text, Left, Right, ListItem, Thumbnail, Body, List} from 'native-base';
import axios from 'axios';
import { getOrder } from "../../../apiServices/index";
import {REACT_APP_API} from '../../../../APIUrl';
import {REACT_APP_API_Image} from '../../../../APIUrl';


var {width, height} = Dimensions.get('window');

const CheckInfo = (props) => {

    const data = props.route.params
    const [order, setOrder] = useState({});


    useEffect(() => {
        getOrder();
        return () => {
            setOrder();
        };
      }, [props]);

    const getOrder = () => {
          axios
            .get(`${REACT_APP_API}/orders/` + data._id)
            .then(data => {
                setOrder(data.data);
            })
            .catch(e => {
              console.log(e);
            });
    };

  return (
    <View style={{marginTop:50}}>
      <Image 
          style = {{height: 350, resizeMode : 'cover', margin: 5 }}
          source={{uri: `${REACT_APP_API_Image}/image/`+ data._id +'.png'}}
      />
      <View style={{borderWidth: 1, borderColor: 'orange', padding: 8}}>
        <Text style={styles.title}>Your Order Info:</Text>
            <View style={{padding: 8}}>
                <Text>Room: {order.room}</Text>
                <Text >Phone: {order.phone}</Text>
                <Text >Date Ordered: {order.dateOrdered}</Text>
                <Text >Date Retrun: {order.returnDate}</Text>
                <Text >Total Product: {order.totalProduct}</Text>
            </View>
          <Text style={styles.title}>Items:</Text>
              <List
                dataArray={order.orderItems}
                renderRow={x => (
                  <ListItem key={x.id} avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `${REACT_APP_API_Image}` + x.product.imageLink,
                        }}
                      />
                    </Left>
                    <Body style={styles.body}>
                      <Left>
                        <Text>{x.product.name}</Text>
                      </Left>
                      <Right>
                        <Text>{x.product.description}</Text>
                      </Right>
                    </Body>
                  </ListItem>
              )}></List>
      </View> 
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    height: height / 1.8,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
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

export default (CheckInfo);