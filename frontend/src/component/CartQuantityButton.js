import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { COLORS, SIZES, icons } from "../constants/index";

function CartQuantityButton({ containerStyle, iconStyle, onPress }) {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: "#f6d6d4",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icons.basket}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
}

export default CartQuantityButton;
