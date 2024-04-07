import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from "react-native";
import { COLORS, currencySymbol } from "../common/util";

const CartScreen = ({ navigation, route }) => {

    var selectedArray1 = route.params.selectedArray;
    const [dataArray, setDataArray] = useState(selectedArray1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let tempTotal = 0;
        dataArray.forEach(element => {
            tempTotal = tempTotal + (element.quantity * element.price)
        });
        setTotal(tempTotal);
    }, [dataArray]);

    const onMinusClick = (item, index) => {
        if (index < dataArray.length && item.quantity > 0) {
            let temp = [...dataArray];
            const newQty = temp[index].quantity - 1;
            temp[index].quantity = newQty;
            setDataArray(temp);
            if (newQty === 0) {
                let temp = [...dataArray];
                temp.splice(index, 1);
                setDataArray(temp);
            }
        }
    }

    const onPlusClick = (item, index) => {
        if (index < dataArray.length) {
            let temp = [...dataArray];
            const newQty = temp[index].quantity + 1;
            temp[index].quantity = newQty;
            setDataArray(temp);
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
                        <Text style={styles.textStyle}>Price: {currencySymbol}{item.price}</Text>
                        <Text style={styles.subTotalStyle}>SubTotal: {currencySymbol}{(item.quantity * item.price)}</Text>
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
            <View style={styles.totalContainer}>
                <Text style={styles.totalLblStyle}>Total: </Text>
                <Text style={styles.totalStyle}>{total}</Text>
            </View>
            <Button
                title="Checkout"
                onPress={() => { }}
            />
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.cartBg },
    listStyle: { paddingBottom: 130, paddingHorizontal: 5 },
    itemContainer: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 8,
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
        backgroundColor: COLORS.cartBg
    },
    subTotalStyle: {
        fontSize: 19,
        color: COLORS.black
    },
    totalContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    totalLblStyle: {
        fontSize: 20,
        color: 'blue',
        flex: 1,
    },
    totalStyle: {
        fontSize: 20,
        color: 'blue',
        fontWeight: "bold"
    }
})
export default CartScreen;