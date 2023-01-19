import React, { useEffect, useState } from "react";
import { Animated, View, Dimensions, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl, Text, ScrollView } from "react-native";
import ProductView from "./ProductView";
import CarouselComp from "./CarouselComp"
import Catagories from "./Catagories"
import SearchableCatagories from "./SearchableCatagories";
import { BASE_URL } from '../env'
import { transform } from "@babel/core";

import LinearGradient from 'react-native-linear-gradient';



const SignBoard = () => {
    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <LinearGradient colors={['#66bfff', '#006dba', '#01497d']} style={styles.signBoard}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: '50%',
                            height: 200,
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 35,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 20,
                                transform: [{ rotate: '-10deg' }]
                            }}>
                                Watch the videos
                            </Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 10,
                                transform: [{ rotate: '4deg' }]
                            }}>
                                And then buy
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                height: 200,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={{ uri: 'https://lh3.googleusercontent.com/g8I0sSqGyz0and1Fmem_vQwrAHvlG08X5vGF4VNwOusVNKQn5B1oxMdsMF3hSUVRO1nQ5aUMQrHmywbLSodO772h5Q7sOv8f26lJ4IO0poebnFxA-mHMZf2lAgz-1Wr28xABOq0O2cQA3PPmFMcR1MT9fb6OpeaN5jSgC-ReuHKjTH04qPnZzhxJZN5Eg1Bkoo1YCho2htRztqQk2jbupN0TBUbdRrzX9_tQ9PRMtGFCsDq_HdUFkzmi5uGOqX4DTgGn2qb_xEYU4UTjEqOajWiJQBiVvh9XhN9pNl8oG6BnuZAbwYx0RXy9QBHDS1medMA7SL6SeQgMg3Ub9gUzLYzmmIua81a6UJvnO8FrHC8pmEIv5wizVhUztNxbGhmY9WgPf8-fB60R1NrUHyU5rth4hKOZDj6YxLbyNkNf9Ur0lCJGslAbgYAQ-0zI5CLRggw13OKK8GSuPoObXc2zqcNPduLwi8j4ScYFTXy9r5SPA24VKypjl5kcx5_B3Gvo_UqId3Nm17wk4mvdZdwFknKO9ZQlyOMMklutk2JkX29cKY-PBRk_SVlIPjRYFBYpu7xJPJAEWCH1hbSrrNW0CPuixiSltKcO2xpVI1N5RzDopabz6MLly8XexqU-kiJLndeCLiAL4gNlVInDNS2tveA6Tn-hH9otU9GsRr4KQeEcq2PSTlosQJ1kYrfGUttlSAkit_tItj5nmiWu1k-LeqgmRrVSUjg3t-a787h5zTh-RxQKlfvpjxOJ7LvHIf1634V8fhs1WcK5wBigwVG7HO4uK2DWtpkUkM5e3BnvMdB-0Hdmz7svRqxpALKB-MXIGuFAMYYAipKUE9YbENZlM5diRMLtLZ1tkygif-w67ZpJTjec7uT-4Yp6tcbRH1xqCF4nt3Yzb7OacY5RcYvSDM2Lo_eCQTZpgIkPWGG2rZh8YC8GcIfx_DFkoi_mb0pEiTXE8T1j7X6jracaSfY=s500-no?authuser=0' }}
                                style={{ width: 200, height: 200 }} />

                        </View>

                    </View>
                </LinearGradient>
            </View>
        </>
    )
}

const Header = ({ setHiddenStateProducts, setHideHeader, setIgnoreSearch, catagorySearchProducts, setCatagorySearchProducts }) => {

    return (
        <>
            <SearchableCatagories setHiddenStateProducts={setHiddenStateProducts} setHideHeader={setHideHeader} setIgnoreSearch={setIgnoreSearch} setCatagorySearchProducts={setCatagorySearchProducts} />
            <CarouselComp />
            <SignBoard />
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

    signBoard: {
        height: 200,
        width: Dimensions.get('window').width - 40,
        borderRadius: 10,
        marginBottom: 10
    }
});

export default InfiniteList;