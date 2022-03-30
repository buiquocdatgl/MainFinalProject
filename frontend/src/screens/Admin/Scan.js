import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {images} from '../../constants/index';

const Camera = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    props.navigation.navigate('Order', {data: data});
  };
  console.log(scanned);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            marginTop: '-5%',
            width: 200,
            height: 300,
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {renderScanFocus()}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Camera;
