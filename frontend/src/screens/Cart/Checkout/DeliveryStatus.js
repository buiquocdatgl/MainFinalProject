import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';
import Header from '../../../component/Header';
import LineDiver from '../../../component/LineDiver';
import TextButton from '../../../component/TextButton';
import { useFocusEffect } from "@react-navigation/native";
import { REACT_APP_API } from '../../../../APIUrl';
import { REACT_APP_API_Image } from '../../../../APIUrl';
import { images, COLORS, SIZES, FONTS, icons } from '../../../constants/index';

function DeliveryStatus(props) {


  const data = props.route.params
  const [order, setOrder] = useState({});
  const [currenStep, setCurrenStep] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const interval = setTimeout(() => {
        setCurrenStep(1);
  
      }, 3000);

      return () => {
        clearTimeout(interval);

        isActive = false;
      };
    }, [])
  );


  const trackOrder = [
    { id: 1, title: 'Wating Confirm', sub_title: 'Your order has been received' },
    { id: 2, title: 'Order Confirm', sub_title: 'Your order has been prepared' },
  ];

  function renderHeader() {
    return (
      <Header
        title="DELIVERY STATUS"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 70
        }}
      />
    )
  }

  function rednerInfo() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.gray
          }}
        >
          Date Rent
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {`${order?.dateOrdered?.split('T')[0]} / ${order?.returnDate?.split('T')[0]}`}
        </Text>
      </View>
    )
  }

  function rednerTrackOrder() {
    return (
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray1,
          backgroundColor: '#fbfbfb',
        }}
      >
        {/* Track Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 25,
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            Track Order
          </Text>
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >
            NY012345
          </Text>
        </View>

        <LineDiver
          lineStyle={{
            backgroundColor: COLORS.lightGray1
          }}
        />

        {/* Status */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: SIZES.padding
          }}
        >
          {trackOrder.map((item, index) => {
            return (
              <View
                key={`StatusList-${index}`}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                    paddingLeft: 10
                  }}
                >
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: index <= currenStep ? '#FF6C44' : COLORS.lightGray1
                    }}
                  />

                  <View
                    style={{
                      marginLeft: 7,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ color: "#666666" }}>{item.sub_title}</Text>
                  </View>
                </View>

                {index < trackOrder.length - 1 &&
                  <View>
                    {index < currenStep &&
                      <View
                        style={{
                          height: 40,
                          width: 3,
                          marginLeft: 28,
                          backgroundColor: '#FF6C44',
                          zIndex: -1
                        }}
                      />
                    }
                    {index >= currenStep &&
                      <View
                        style={{
                          height: 40,
                          width: 3,
                          marginLeft: 28,
                          backgroundColor: COLORS.lightGray1,
                          borderStyle: "dotted",
                          marginTop: 2
                        }}
                      />
                      // <Image
                      //   key={index}
                      //   source={icons.dotted}
                      //   resizeMode="cover"
                      //   style={{
                      //     width: 4,
                      //     height: 43,
                      //     marginLeft: 27,
                      //     color: COLORS.lightGray1
                      //   }}
                      // />

                    }
                  </View>
                }
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  function renderFooter() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginBottom:25
        }}
      >
        <TextButton
          label="OK"
          buttonContainerStyle={{
            height: 55,
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            width: 200,
            marginLeft: 90,
          }}
          onPress={() => props.navigation.navigate("Success")}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white
      }}>
      {/* Header */}
      {renderHeader()}

      {/* Info */}
      {rednerInfo()}

      {/* Track Order */}
      <ScrollView
        showsHorizontalScrollIndicator={false}

      >
        {rednerTrackOrder()}
      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  )
}

export default DeliveryStatus