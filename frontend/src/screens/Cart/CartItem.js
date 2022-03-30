import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  const data = props.item.item;
  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: "http://192.168.101.9:11000" + data.imageLink,
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.name}</Text>
          <Text>{data.description}</Text>
        </Left>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CartItem;
