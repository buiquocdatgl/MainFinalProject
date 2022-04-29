import React, { useEffect, useState, useContext } from "react";
import { Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { Item, Picker, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { connect } from "react-redux";


const Checkout = (props) => {

  const [orderItems, setOrderItems] = useState();
  const [room, setRoom] = useState();
  const [phone, setPhone] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [returnDate, setReturnDate] = useState(new Date())
  const [datePickerVisible, setDatePickerVisibility] = useState(false);

  console.log('asdasdsa');
  console.log(props.userProfile);

  useEffect(() => {
    setOrderItems(props.cartItems);
    return () => {
      setOrderItems();
    };
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setReturnDate(date);
    hideDatePicker();
  };

  const checkOut = () => {
    
    let order = {
        dateOrdered: Date.now(),
        orderItems,
        phone,
        room,
        returnDate,
        status: "3",
    }

    props.navigation.navigate("Confirm", {order: order })
}

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
    <FormContainer title={"Shipping Address"}>
        <Text>Phone:</Text>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Text>Room:</Text>
        <Input
          placeholder={"Room"}
          name={"Room"}
          value={room}
          keyboardType={"numeric"}
          onChangeText={(text) => setRoom(text)}
        />
        <Text>Return Date:</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Input
            name={"Room"}
            value={returnDate.toDateString()}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
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

export default connect(mapStateToProps)(Checkout);
