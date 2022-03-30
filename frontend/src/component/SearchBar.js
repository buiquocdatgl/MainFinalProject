import React from "react";
import { View, Text, Image } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar() {
    return (
        <View style={{ marginTop: 15, marginBottom: 15, flexDirection: "row", width: "80%", marginLeft: -3}}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                styles={{
                    textInput: {
                        backgroundColor: "#eee",
                        borderRadius: 20,
                        fontWeight: "700",
                        marginTop: 7,
                    },
                    textInputContainer: {
                        backgroundColor: "#eee",
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 14,
                    },
                }}
                renderLeftButton={() => (
                    <View style={{height: "100%" }}>
                        <Ionicons name="search" size={24} style={{ marginTop: 16, marginLeft: 15 }} />
                    </View>
                )}
                renderRightButton={() => (
                    <View
                        style={{
                            flexDirection: "row",
                            marginRight: 8,
                            backgroundColor: "white",
                            padding: 9,
                            borderRadius: 30,
                            alignItems: "center",
                        }}
                    >
                        <AntDesign
                            name="clockcircle"
                            size={11}
                            style={{ marginRight: 6 }}
                        />
                        <Text>Search</Text>
                    </View>
                )}
            />
        </View>
    );
}
