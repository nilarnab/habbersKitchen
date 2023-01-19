import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const image = { uri: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" };

const SignBoard = ({ item }) => {
    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                overflow: 'hidden',
            }}>
                <LinearGradient colors={[item.background_color_1, item.background_color_2, item.background_color_3]} style={styles.signBoard}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: '50%',
                            height: 'auto',
                        }}>
                            <Text style={{
                                color: item.title_color,
                                fontSize: 35,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 20,
                                transform: [{ rotate: item.title_angle + 'deg' }]
                            }}>
                                {item.title}
                            </Text>
                            <Text style={{
                                color: item.body_color,
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 10,
                                transform: [{ rotate: item.body_angle + 'deg' }]
                            }}>
                                {item.body}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: '50%',
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={{ uri: item.img }}
                                style={{ width: 200, height: 200 }} />

                        </View>

                    </View>
                </LinearGradient>
            </View>
        </>
    )
}

const CarouselCardItem = ({ item, index }) => {
    console.log("carousel data at item", item);
    if (item.type == 1) {

        return (
            <View style={styles.container} key={index}>
                <ImageBackground source={{ uri: item.imgUrl }} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 8 }}>
                    <Text style={styles.header}>{item.title}</Text>
                </ImageBackground>
            </View>
        )
    }
    else {
        return <>
            <View style={styles.container} key={index}>
                <View style={styles.image}>
                    <SignBoard item={item} />
                </View>
            </View>
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        width: ITEM_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginLeft: 20,
        marginBottom: 12
    },
    image: {
        width: ITEM_WIDTH,
        height: 200,
        borderRadius: 8
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20,
        position: 'absolute',
        bottom: 0
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 0,
        paddingRight: 0
    },
    signBoard: {
        height: 'auto',
        width: 'auto',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
    }
})

export default CarouselCardItem