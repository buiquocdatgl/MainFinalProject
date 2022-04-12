import React from 'react'
import { View, SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, icons } from '../../constants/index';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Header from '../../component/Header';
import IconButton from '../../component/IconButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Profile() {

    function renderHeader() {
        return (
            <Header
                title="Profile"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 50,
                    textAlign: 'center',
                    fontSize: 50

                }}
            />
        );
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 10,
                            marginBottom: 5,
                        }]}>John Doe</Text>
                        <Text style={styles.caption}>@j_doe</Text>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+91-900000009</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>john_doe@email.com</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Text>₹140.50</Text>
                    <Text>Wallet</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>12</Text>
                    <Text>Orders</Text>
                </View>
            </View>

            <View style={styles.menuWrapper}>

                <View style={styles.menuItem}>
                    <Icon name="heart-outline" color="#FF6347" size={25} />
                    <Text style={styles.menuItemText}>Your Favorites</Text>
                </View>


                <View style={styles.menuItem}>
                    <Icon name="credit-card" color="#FF6347" size={25} />
                    <Text style={styles.menuItemText}>Payment</Text>
                </View>


                <View style={styles.menuItem}>
                    <Icon name="share-outline" color="#FF6347" size={25} />
                    <Text style={styles.menuItemText}>Tell Your Friends</Text>
                </View>


                <View style={styles.menuItem}>
                    <Icon name="account-check-outline" color="#FF6347" size={25} />
                    <Text style={styles.menuItemText}>Support</Text>
                </View>


                <View style={styles.menuItem}>
                    <Icon name="settings-outline" color="#FF6347" size={25} />
                    <Text style={styles.menuItemText}>Settings</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginTop: 10
    },
});

export default Profile