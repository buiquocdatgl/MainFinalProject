import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS } from "../../constants/index";

import SearchBar from "../../component/SearchBar";
import { getProduct } from "../../apiServices/index";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const HomeScreen = ({ navigation, props }) => {
  const optionsList = [
    { id: 1, title: "Table", img: require("../../assets/images/home1.png") },
    { id: 2, title: "Chair", img: require("../../assets/images/home2.png") },
    {
      id: 3,
      title: "Projector",
      img: require("../../assets/images/home3.png"),
    },
    { id: 4, title: "Micro", img: require("../../assets/images/home4.png") },
  ];

  

  const [editProduct, setEditProduct] = useState([]);
  const categoryList = ["Popular", "Recommended", "Nearest"];
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const { data, status } = await getProduct();
      console.log("fetching");
      if (status === 200) {
        setEditProduct((prev) => data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const ListCategories = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    return (
      <View style={styles.categoryListContainer}>
        {categoryList.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryListText,
                index == selectedCategoryIndex && styles.activeCategoryListText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  function renderListOptions() {
    const renderItem = ({ item }) => {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 220 }}
        >
          <TouchableOpacity style={styles.optionsCard}>
            {/* House image */}
            <Image source={item.img} style={styles.optionsCardImage} />

            {/* Option title */}
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      );
    };
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <FlatList
          data={optionsList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          // contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image
          source={require("../../assets/images/banner-2.jpg")}
          resizeMode="stretch"
          style={styles.img}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/scan.png")}
            style={{ width: 60, height: 60, marginTop: 12, marginLeft: 15 }}
          />
        </TouchableOpacity>

        <SearchBar />
      </View>

      {/* Render list options */}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
              }}
            >
              Recommended
            </Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#D8352C",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
              >
                More
              </Text>
            </View>
          </View>
        </View>
        {renderListOptions()}
        <ListCategories />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth)
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal
            data={editProduct}
            contentContainerStyle={{
              paddingVertical: SIZES.padding * 2,
              paddingBottom: 30,
              paddingLeft: 10,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ProductCard
                item={item}
                index={index}
                activeCardIndex={activeCardIndex}
                scrollX={scrollX}
              />
            )}
            snapToInterval={cardWidth}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    // height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  head: {
    width: "100%",
    height: "30%",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -30,
    width: "100%",
  },
  // header: {
  //     marginTop: 25,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  // },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },

  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: COLORS.pink,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },
  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    paddingHorizontal: 40,
  },
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

export default HomeScreen;
