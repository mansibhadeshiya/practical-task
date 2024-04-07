import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from "react-native";
import { COLORS, currencySymbol } from "../common/util";
import Snackbar from "react-native-snackbar";

const HomeScreen = ({ navigation, route }) => {

    const [dataArray, setDataArray] = useState([
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 100,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 90,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 50,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 140,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 200,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 250,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 110,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 90,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 180,
            quantity: 0
        },
        {
            name: "Lorem ipsum amet",
            image: "https://picsum.photos/200",
            price: 70,
            quantity: 0
        }
    ]);
    const [totalItems, setTotalItems] = useState(0);

    const onMinusClick = (item, index) => {
        if (index < dataArray.length && item.quantity > 0) {
            let temp = [...dataArray];
            const newQty = temp[index].quantity - 1;
            temp[index].quantity = newQty;
            setDataArray(temp);
            setTotalItems(totalItems - 1);
        }
    }

    const onPlusClick = (item, index) => {
        if (index < dataArray.length) {
            let temp = [...dataArray];
            const newQty = temp[index].quantity + 1;
            temp[index].quantity = newQty;
            setDataArray(temp);
            setTotalItems(totalItems + 1);

        }
    }

    const onAddToCartClick = () => {
        if (totalItems > 0) {
            let selectedArray = [];
            dataArray.forEach(element => {
                if (element.quantity > 0) {
                    selectedArray.push(element);
                }
            });
            navigation.navigate("CartScreen", { selectedArray: selectedArray })
        } else {
            Snackbar.show({ text: 'Please select product', duration: Snackbar.LENGTH_LONG })
        }
    }

    return <View style={styles.container}>
        <FlatList
            data={dataArray}
            contentContainerStyle={styles.listStyle}
            renderItem={({ item, index }) => {
                return (<View style={styles.itemContainer}>
                    <Image source={{ uri: item.image }} style={styles.imgStyle} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <Text style={styles.textStyle}>{currencySymbol}{item.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => onMinusClick(item, index)}>
                        <Image style={styles.imgBtnStyle} source={require('../images/minus.png')} />
                    </TouchableOpacity>
                    <Text style={styles.qtyStyle}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => onPlusClick(item, index)}>
                        <Image style={styles.imgBtnStyle} source={require('../images/plus.png')} />
                    </TouchableOpacity>
                </View>)
            }}
        />
        <View style={styles.bottomView}>
            <Button
                title="Add to cart"
                onPress={() => onAddToCartClick()}
            />
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    listStyle: { paddingBottom: 70 },
    itemContainer: {
        flexDirection: 'row',
        margin: 5,
        paddingStart: 5,
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    textStyle: {
        fontSize: 18,
        color: COLORS.black
    },
    imgStyle: {
        width: 70, height: 70, borderRadius: 10, marginEnd: 10,
    },
    imageContainer: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.lightBg,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 10,
        marginEnd: 10,
    },
    imgBtnStyle: {
        width: 20, height: 20
    },
    qtyStyle: {
        color: 'green',
        fontSize: 18,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 15,
    }
})
export default HomeScreen;