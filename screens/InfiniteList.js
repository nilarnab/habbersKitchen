import React, { useEffect, useState } from "react";
import { Animated, View, Dimensions, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl, Text, ScrollView } from "react-native";
import ProductView from "./ProductView";
import CarouselComp from "./CarouselComp"
import Catagories from "./Catagories"
import SearchableCatagories from "./SearchableCatagories";
import { BASE_URL } from '../env'
import { transform } from "@babel/core";

import LinearGradient from 'react-native-linear-gradient';





const Header = ({ setHiddenStateProducts, setHideHeader, setIgnoreSearch, catagorySearchProducts, setCatagorySearchProducts }) => {

    return (
        <>
            <SearchableCatagories setHiddenStateProducts={setHiddenStateProducts} setHideHeader={setHideHeader} setIgnoreSearch={setIgnoreSearch} setCatagorySearchProducts={setCatagorySearchProducts} />
            <CarouselComp />
            <Catagories />
            <View style={styles.catagoryBlock}>
                {/* <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/wedding-gift.png' }} style={{ width: 35, height: 35 }} />
                <Text style={styles.catagoryText}>Buy Exclusive ..</Text> */}
            </View>
        </>
    )
}

const renderItems = (arr) => {

    return <ScrollView style={{}}>

        {
            arr.map(el =>
                (<ProductView item={el} key={el._id} />)
            )


        }
    </ScrollView>

}



const InfiniteList = (props) => {
    const [products, setProducts] = useState([]);
    const [refreshing,] = useState(false);
    const [pagination, setPagination] = useState(0);
    const [finished, setFinished] = useState(false);
    const [HiddenStateProduct, setHiddenStateProduct] = useState([]);

    const navigation = props.navigation;

    /**
     * The compoenent visible at the bottom of the infinite list
    */
    const renderFooter = () => {
        return (
            <View style={styles.loaderStyle}>
                {finished ?
                    <Text>Finished infinite list</Text>
                    :
                    <ActivityIndicator size="large" color="#aaa" />
                }
            </View>
        );
    };

    const loadMoreItems = () => {
        setPagination(pagination + 1);
    };

    const resetList = () => {
        setProducts([]);
        setFinished(false);
        setPagination(0);
    };

    useEffect(() => {

        setHiddenStateProduct(props.list)

        /**
     * Fetch the products via the API, then update the products state
     */
        const getProducts = () => {
            // console.log("trying to get products")
            fetch(BASE_URL + `products/getAllProducts`, { method: 'GET' })
                .then(res => res.json())
                .then(({ allProducts }) => {
                    if (allProducts.length === 0)
                        setFinished(true);
                    else
                        setProducts([...products, ...allProducts])
                });
        };

        getProducts();
    }, [pagination]);


    if (props.ignoreSearch) {
        return (
            <>
                <FlatList
                    data={props.catagorySearchProducts}
                    renderItem={(item) => <ProductView item={item.item} navigation={navigation} />}
                    initialNumToRender={1}
                    numColumns={2}
                    // TODO: Fix in production
                    keyExtractor={item => Math.random()}
                    onEndReached={loadMoreItems}
                    onEndReachedThreshold={1}
                />
            </>
        )

    }
    else {

        if (!props.hideHeader) {

            return (

                <FlatList
                    data={products}
                    renderItem={(item) => <ProductView item={item.item} navigation={navigation} />}
                    initialNumToRender={1}
                    // TODO: Fix in production
                    keyExtractor={item => Math.random()}
                    ListHeaderComponent={
                        <Header
                            setHiddenStateProducts={setHiddenStateProduct}
                            setHideHeader={props.setHideHeader}
                            setIgnoreSearch={props.setIgnoreSearch}
                            catagorySearchProducts={props.catagorySearchProducts}
                            setCatagorySearchProducts={props.setCatagorySearchProducts}
                        />}
                    ListFooterComponent={renderFooter}
                    // onEndReached={loadMoreItems}
                    onEndReachedThreshold={1}
                    refreshing={refreshing}
                    onRefresh={resetList}
                    numColumns={2}
                    style={{ alignSelf: 'center', backgroundColor: 'white' }}

                />
            )
        }
        else {

            return (
                <>
                    <FlatList
                        data={HiddenStateProduct}
                        renderItem={(item) => <ProductView item={item.item} navigation={navigation} />}
                        initialNumToRender={1}
                        numColumns={2}
                        // TODO: Fix in production
                        keyExtractor={item => Math.random()}
                        onEndReached={loadMoreItems}
                        onEndReachedThreshold={1}
                    />
                </>
            )
        }
    }

};

const styles = StyleSheet.create({
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center",
    },

    catagoryBlock: {
        fontWeight: '800',
        height: 0,
        width: '100%',
        color: 'black',
        flexDirection: 'row',
        borderTopColor: 'lightgrey',
        borderTopWidth: 0,
        backgroundColor: 'white',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        transform: [{ translateY: 20 }],

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -16,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,

    },

    catagoryText: {
        fontWeight: '800',
        fontSize: 25,
        marginLeft: 10,
        color: 'black',
        flexDirection: 'row',
    },

});

export default InfiniteList;