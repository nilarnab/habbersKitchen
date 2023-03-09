import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    SectionList,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'
import Header from './NonSearchHeader';
import SideBar from '../SideBar';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import GetLocation from 'react-native-get-location';
import fetch_home from '../methods/fetch';

const Rendarable = ({ recVisited }) => {

    const [nameEditProgress, setNameEditProgress] = useState(true)
    const [underlineColor, setUnderlineColor] = useState('ligthgray')
    const [loading, setLoading] = useState(false)

    const PersonalInfo = () => {
        const [infoUpdateProgress, setInfoUpdateProgress] = useState(false)
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const [phone, setPhone] = useState("")

        const getName = async () => {

            var name = await AsyncStorage.getItem('name')
            setName(name)

        }

        const getPhone = async () => {
            var phone = auth().currentUser.phoneNumber
            setPhone(phone)
        }

        const getEmail = async () => {
            var email = await AsyncStorage.getItem('email')
            setEmail(email)
        }

        useEffect(() => {
            console.log('getting person name <<>> ')
            getName()
            getEmail()
            getPhone()
        }, [])

        const EditButton = () => {

            const resetName = async () => {
                // send name
                setLoading(true)

                var uuid = await AsyncStorage.getItem('uuid')
                var user_id = await AsyncStorage.getItem('user_id')

                const resp = await fetch_home(BASE_URL + `userInfo/update_name?uuid=${uuid}&user_id=${user_id}&name=${name}`, { method: 'POST' })
                var resp_json = await resp.json();

                console.log(resp_json)

                await AsyncStorage.setItem('name', name)

                setNameEditProgress(true)
                setUnderlineColor('white')

                setLoading(false)
            }

            const resetEmail = async () => {
                // await AsyncStorage.setItem('email', email)
                setEmail(email)
                await AsyncStorage.setItem('email', email)
                console.log('>>>> setting email', email)
            }

            if (!infoUpdateProgress) {
                return (
                    <TouchableOpacity onPress={() => {
                        setInfoUpdateProgress(true)
                    }} style={{
                        left: 10,
                        top: 10,
                        position: 'absolute',
                        borderColor: COLOR4,
                        borderWidth: 2,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}>
                        <Text style={{
                            color: COLOR4,
                            fontSize: 12,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>Edit</Text>
                    </TouchableOpacity>
                )
            }

            else {
                return (
                    <TouchableOpacity onPress={async () => {
                        await resetName()
                        await AsyncStorage.setItem('email', email)
                        setInfoUpdateProgress(false)
                    }} style={{
                        left: 10,
                        top: 10,
                        position: 'absolute',
                        borderColor: COLOR3,
                        borderWidth: 2,
                        borderRadius: 5,
                        backgroundColor: COLOR4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5,

                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>Save</Text>
                    </TouchableOpacity>
                )
            }

        }

        if (infoUpdateProgress) {
            return (<>
                <View
                    style={{
                        alignSelf: 'center',
                        width: '80%',
                        height: 'auto',
                        paddingVertical: 50,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        marginVertical: 10,
                        paddingLeft: 10,
                        borderColor: COLOR4,
                        borderWidth: 1,
                        shadowColor: "green",
                        elevation: 5,
                        overflow: 'hidden',
                    }}>

                    <EditButton />

                    <TextInput
                        style={{
                            fontSize: 15,
                            color: 'blue',
                            height: 40,
                            backgroundColor: 'white',
                        }} placeholder={'Your Name'}
                        underlineColor={COLOR3}
                        activeUnderlineColor={COLOR4}
                        onChangeText={setName}
                        value={name} />

                    <TextInput
                        style={{
                            fontSize: 15,
                            color: 'blue',
                            height: 40,
                            backgroundColor: 'white',
                        }} placeholder={'New Email'}
                        onChangeText={setEmail}
                        underlineColor={COLOR3}
                        activeUnderlineColor={COLOR4}
                        value={email} />

                </View>
            </>)
        }
        else {
            return (<>
                <LinearGradient
                    colors={[COLOR1, COLOR1]}
                    style={{
                        alignSelf: 'center',
                        width: '80%',
                        heidth: 'auto',
                        paddingVertical: 50,
                        borderColor: COLOR4,
                        borderRadius: 10,
                        borderWidth: 1,
                        marginVertical: 10,
                        paddingLeft: 10,
                        overflow: 'hidden',
                        shadowColor: COLOR4,
                        elevation: 10,
                    }}>

                    {/* <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: COLOR4,
                        left: -75,
                        bottom: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>
                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: COLOR4,
                        right: -75,
                        top: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View> */}

                    <EditButton />

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'black',
                        }}> {name} </Text>

                    <View
                        style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'black',
                            }}>{phone}</Text>
                        <View style={{
                            width: 5,
                            height: 5,
                            borderRadius: 5,
                            backgroundColor: 'black',
                            marginHorizontal: 5,
                            marginTop: 7,
                        }}></View>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'black',
                            }}>{email}</Text>
                    </View>

                </LinearGradient>
            </>)
        }

    }

    const LocationData = () => {

        const [lat, setLat] = useState(0.0)
        const [long, setLong] = useState(0.0)
        const [latMarker, setLatMarker] = useState(0.0)
        const [longMarker, setLongMarker] = useState(0.0)
        const [addr1, setAddr1] = useState('')
        const [addr2, setAddr2] = useState('')
        const [pin, setPin] = useState('')
        const [city, setCity] = useState('')
        const [loading, setLoading] = useState(false)
        const [getLocatonButton, setGetLocatonButton] = useState('Get Current Location')
        const [confLocationButton, setConfLocationButton] = useState('Confirm location')
        const [locationRecieved, setLocationRecieved] = useState(false)

        const findCoordinates = () => {

            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    // console.log(location);
                    setLat(location.latitude.toString())
                    setLong(location.longitude.toString())

                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                })
        };

        useEffect(() => {

            const getCachedLocation = async () => {

                var loc_lat = await AsyncStorage.getItem("loc_lat")
                var loc_long = await AsyncStorage.getItem("loc_long")
                var loc_addr1 = await AsyncStorage.getItem("loc_addr1")
                var loc_addr2 = await AsyncStorage.getItem("loc_addr2")
                var loc_pin = await AsyncStorage.getItem("loc_pin")
                var loc_city = await AsyncStorage.getItem("city")


                if (loc_lat == null || loc_long == null) {
                    await findCoordinates()
                }


                if (loc_lat != null && !isNaN(loc_lat)) {

                    setLat(parseFloat(loc_lat))
                    setLatMarker(parseFloat(loc_lat))
                }

                if (loc_long != null && !isNaN(loc_long)) {
                    console.log("setting up lat")
                    setLong(parseFloat(loc_long))
                    setLongMarker(parseFloat(loc_long))
                }
                if (loc_addr1 != null) {
                    console.log("addr 1 is set as", loc_addr1)
                    setAddr1(loc_addr1)
                }
                else {
                    console.log("addr is not set")
                    setAddr1('')
                }

                if (loc_addr2 != null) {
                    setAddr2(loc_addr2)
                }
                else {
                    setAddr2('')
                }

                if (loc_city != null) {
                    setCity(loc_city)
                }
                else {
                    setCity('')
                }

                if (loc_pin != null) {
                    setPin(loc_pin)
                }
                else {
                    setPin('')
                }


                console.log("received")
            }

            getCachedLocation()
        }, [])

        const submitLocation = async () => {
            setLoading(true)
            setConfLocationButton('submitting ..')

            var message = ''

            if (addr1)
                await AsyncStorage.setItem("loc_addr1", addr1)
            else
                message = 'First Address line is empty !!'

            if (addr2)
                await AsyncStorage.setItem("loc_addr2", addr2)
            else
                message = 'Second Address line is empty'

            if (pin)
                await AsyncStorage.setItem("loc_pin", pin)
            else
                message = 'Your PIN ?'

            if (city)
                await AsyncStorage.setItem("city", city)
            else
                message = "Please provide your city name"

            setLoading(false)

            if (message == '') {
                // setStage(1)
                setConfLocationButton('Confirm Location')
            }
            else {
                setConfLocationButton(message)
            }

        }

        return <>

            <View style={{
                backgroundColor: COLOR1,
                height: 'auto',
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 20,
                marginHorizontal: 20,
                borderRadius: 10,
                shadowColor: 'black',
                elevation: 5,
            }}>

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'black',
                    }}>
                    Location Details
                </Text>

                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                        transform: [{ translateY: 10 }],
                    }}>
                    Address Line 1:
                </Text>

                <TextInput
                    onChangeText={setAddr1}
                    value={addr1}
                    style={styles.inputStyleLocation}
                    activeUnderlineColor={COLOR4}
                ></TextInput>

                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                        transform: [{ translateY: 10 }],
                    }}>
                    Address Line 2:
                </Text>
                <TextInput
                    onChangeText={setAddr2}
                    value={addr2}
                    style={styles.inputStyleLocation}
                    activeUnderlineColor={COLOR4}
                ></TextInput>

                <View
                    style={{
                        flexDirection: 'row',
                        width: 'auto',
                        height: 'auto',
                    }}>

                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black',
                            transform: [{ translateY: 20 }],
                        }}>
                        PIN:
                    </Text>

                    <TextInput
                        placeholder='Pin Address'
                        keyboardType="numeric"
                        style={{
                            width: '30%',
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        underlineColorAndroid={COLOR3}
                        onChangeText={setPin}
                        placeholderTextColor="lightgray"
                        activeUnderlineColor={COLOR4}
                        value={pin}></TextInput>


                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'black',
                            transform: [{ translateY: 20 }],
                        }}>
                        City:
                    </Text>

                    <TextInput
                        placeholder='City'
                        style={{
                            width: '40%',
                            color: 'black',
                            backgroundColor: 'white'
                        }}
                        underlineColorAndroid="aliceblue"
                        onChangeText={setCity}
                        placeholderTextColor="lightgray"
                        activeUnderlineColor={COLOR4}
                        value={city}></TextInput>
                </View>

                <TouchableOpacity style={styles.buttonStyleLocation} onPress={submitLocation}>
                    <Text style={styles.buttonTextStyleLocation}>{confLocationButton}</Text>
                </TouchableOpacity>


            </View>




        </>
    }

    // console.log([recVisited,...SECTIONS])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PersonalInfo />
            <LocationData />
        </SafeAreaView>
    )
}




export const ProfilePage = (props) => {
    const [recVisited, setRecVisited] = useState({ title: 'Recently Visited', data: [] })

    const isFocused = useIsFocused()

    useEffect(() => {



        const sendPagePopularityMetric = async () => {

            if (isFocused) {

                var userId = await AsyncStorage.getItem('user_id')

                var response = await fetch_home(BASE_URL + `monitor/send_metric?metric=PAGE_ENGAGEMENT&pagename=PROFILE&userid=${userId}`, { method: 'GET' })

                var response_json = await response.json()
                console.log(response_json)

                var user_id = await AsyncStorage.getItem('user_id')
                // console.log("sending")
                fetch_home(BASE_URL + `userInfo/fetchVisited?uid=${user_id}`, { method: 'GET' })
                    .then(res => res.json())
                    .then(result => { setRecVisited({ title: recVisited.title, data: result }) })
            }

        }

        sendPagePopularityMetric()

    }, [isFocused])

    /* Side bar */
    // -----------------------------
    const [SideMenu, setSideMenu] = useState(0)
    const [mainWidth, setMainWidth] = useState('100%')
    const fadeAnim = useRef(new Animated.Value(0)).current


    useEffect(() => {

        if (SideMenu == 1) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 200,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
        else {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
    }, [SideMenu])

    // -----------------------------

    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOR2,
                elevation: 2,
                flexDirection: 'row'
            }}>


                <Animated.View style={{
                    width: fadeAnim,
                    height: '100%',
                    backgroundColor: 'rgb(240, 240, 245)',
                }}>
                    <SideBar props={props.navigation} setState={setSideMenu} />
                </Animated.View>

                <View style={{
                    width: mainWidth,
                    height: '100%',
                    backgroundColor: COLOR2,
                    elevation: 1
                }}>
                    <Header setState={setSideMenu} State={SideMenu} />
                    {/* <View style={{
                        marginVertical: 0,
                    }}> */}
                    <Rendarable recVisited={recVisited} />
                    {/* </View> */}
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    addressDetails: {
        marginLeft: 20,
        marginRight: 20,
        height: 'auto',
        backgroundColor: COLOR3
    },
    buttonTextLocation: {
        color: COLOR4
    },
    inputStyle: {
        fontSize: 15,
        color: "black"
    },
    inputStyleLocation: {
        fontSize: 15,
        color: "black",
        backgroundColor: '',
        // height: 40
    },
    buttonStyleLocation: {
        backgroundColor: COLOR3,
        width: 'auto',
        height: 'auto',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 20,
        paddingVertical: 10,
    },
    buttonTextStyleLocation: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLOR4,
    }
});
