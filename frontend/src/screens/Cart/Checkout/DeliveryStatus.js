import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import Header from '../../../component/Header';
import LineDiver from '../../../component/LineDiver';
import TextButton from '../../../component/TextButton';
import { images, COLORS, SIZES, FONTS, icons } from '../../../constants/index';

function DeliveryStatus(props) {

  const [currenStep, setCurrenStep] = React.useState(3);

  const trackOrder = [
    { id: 1, title: 'Order Confirmed', sub_title: 'Your order has been received' },
    { id: 2, title: 'Order Prepared', sub_title: 'Your order has been prepared' },
    { id: 3, title: 'Delivery in Progress', sub_title: 'Hang on! Your food is on the way' },
    { id: 4, title: 'Delivered', sub_title: 'Let get pick up' },
    { id: 5, title: 'Rate Us', sub_title: 'Help us improve our service' },
  ];

  function renderHeader() {
    return (
      <Header
        title="DELIVERY STATUS"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 25
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
          Estimated Delivery
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          21 Sept 2021 / 12:30PM
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
          label="Confrim"
          buttonContainerStyle={{
            height: 55,
            marginBottom: SIZES.padding,
            borderRadius: SIZES.radius,
            width: 200,
            marginLeft: 90,
          }}
          onPress={() => navigation.navigate("DeliveryStatus")}
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