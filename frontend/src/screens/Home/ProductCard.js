import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../../constants/index";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const ProductCard = (props) => {
  const { item, index, activeCardIndex, scrollX } = props;

  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.7, 0, 0.7],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });

  return (
    <TouchableOpacity
    disabled={activeCardIndex != index}
    activeOpacity={1}
    onPress={() => {
      props.addItemToCart(item),
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `${item.name} added to Cart`,
          text2: "Go to your cart to complete order",
        });
    }}>
    <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
        <Animated.View style={{ ...styles.cardOverLay, opacity }} />
        <View style={styles.priceTag}>
            <Text
                style={{ color: COLORS.white, fontSize: 20, fontWeight: 'bold' }}>
                <Icon name="add-shopping-cart" size={26} color={COLORS.white} />
            </Text>
        </View>
        <Image   
        source={{
            uri: "http://192.168.101.9:11000" + item.imageLink,
          }} 
          style={styles.cardImage} />
        <View style={styles.cardDetails}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: COLORS.grey, fontSize: 12, marginTop: 5 }}>
                        {item.description}
                    </Text> 
                </View>
                <View
                    style={{
                        backgroundColor: "#eee",
                        height: 30,
                        width: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 15,
                        marginRight: 15
                    }}
                >
                    <Text>{item.quantity}</Text>
                </View>
            </View>
        </View>
    </Animated.View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ amount: 1, product })),
  };
};

const styles = StyleSheet.create({
  card: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    marginTop: 10,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 60,
    backgroundColor: "#d8352c",
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 70,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {
    height: 280,
    width: width,
    flex: 1,
  },
});
export default connect(null, mapDispatchToProps)(ProductCard);
