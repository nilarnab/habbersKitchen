import React, { useState, useEffect, useReducer } from 'react';
import { ActivityIndicator,StatusBar, SafeAreaView,ScrollView, StyleSheet, Text, TextInput, View, FlatList, Button, Dimensions, Image, ImageBackground, Pressable, Touchable, TouchableOpacity,ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { BASE_URL } from '../env';

import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
const ITEM_HEIGHT = Dimensions.get('window').height;
const EventCard = ({daTa}) => {
  //   const {name, categories, deliveryTime, distance, image} = info;
  
  console.log(daTa.prod_id)
  const [Prod_Name,setProd_Name]=useState("")
  const [Ind_Price,setInd_Price]=useState("");
  const [ImageUrl,setImageUrl]=useState(null);
  const [userID,setUserId]=useState("")
  // const [Delete,setDelete]=useState(false)
 
  const getImage=async ()=>{
    
    // , body: JSON.stringify({}),
    await fetch(BASE_URL + `products/get_individual/${daTa.prod_id}`, { method: 'POST',body: JSON.stringify({}), })
    .then((response) => response.json())
    .then((data) => {
      console.log("Quantity found");
            console.log(data);
            if(data){
            // setData(data);
            setProd_Name(data.name);
                       setInd_Price(data.price);
                     setImageUrl(data.image);
           

            }
            else{
             //  setOrderList("Order Undelivered")
             console.log("Some error occured")
             
              
            }
          })
          .catch((error) => {
            console.log(error);
          });

   
          
    }
    useEffect(() => {
        getImage();
    
    }, [])

 

 

  return (
    <>
    
      <View style={styles.cart_item}>

        {/* product Image */}
        <Image source={{ uri: ImageUrl }} style={styles.cartImage}></Image>
        <View style={{ flexDirection: "column", width: "50%" }}>
          <Text style={styles.cartItemName}>{Prod_Name}</Text>

          {/* Product Price */}
          <Text style={styles.price} > &#8377; {Ind_Price}</Text>

          {/* Shiping details */}
          

          {/* In Stock or Out of Stock */}
          <Text style={{ color: "green" }}>In stock</Text>
          <Pressable style={{
              width: 60,
              color: "black",
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 3,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: 'white',
              borderColor: 'tomato',
              margin: 5,
            }} onPress={async () => {
              // setLoading(true)
             
              var user_id_temp = await AsyncStorage.getItem('user_id');
        setUserId(user_id_temp)

        const resp = await fetch(BASE_URL + `wishlist/remove/${userID}/${daTa.prod_id}`, { method: 'POST' })
        const data = await resp.json();
        if(data){
            console.log("data removed");
            ToastAndroid.show('Remove successfully!', ToastAndroid.SHORT);
           
        }
        else{
            console.log("some error has occured")
        }

        

            }} ><Text style={{ color: 'red' }}>Remove</Text>
            </Pressable>
        </View>
      </View>
      
      {/* </View>
      </View> */}
      

   
    </>)
  
};





const Wishlistview = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchCart = async () => {
    var userId = await AsyncStorage.getItem("user_id")
    await fetch(BASE_URL + `wishlist/getwish/${userId}`, { method: 'POST', body: JSON.stringify({}), })
    .then((response) => response.json())
    .then((data) => {
     
            console.log(data);
            if(data){
            setData(data);
       

            }
            else{
            
             console.log("Some error occured")
             
              
            }
          })
          .catch((error) => {
            console.log(error);
          });

}

   
  


  useEffect(() => {

    fetchCart();
  }, []);

  
  

 
  return (
    <>
     
      <View style={styles.container}>
      <ScrollView>

      
        {
               Object.values(Data).map((event,i) =>{
                return <EventCard daTa={event} key={i} />
               })
              }
       
      </ScrollView>
      {/* <Text>{Data.prod_id}</Text> */}
    </View>
      
      </>
    
  );


  

            }
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
     flexDirection:'row',
      display: 'flex',
      flexWrap:"wrap",
     
      height: '100%',
      width: '100%',
      borderColor: 'black',
    },
    textInput: {
      width: '90%',
      height: 50,
      borderColor: 'black',
      borderWidth: 2,
    },
    button: {
      backgroundColor: 'gray',
      padding: 20,
      borderRadius: 200,
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 35,
      right: 20,
    },
    buttonText: {
      color: 'white',
    },
    cart_item: {
      height: 'auto',
      padding: 10,
      display: 'flex',
      flexWrap:"wrap",

      flexDirection: "row",
      justifyContent: "space-between"
    },
    cartImage: {
      width: "45%",
      height: 170,
      borderRadius: 10,
      display:"flex"
    }
    ,
    cartItemName: {
      color: "black",
      fontSize: 21
    },
    price: {
      fontSize: 25,
      color: "black",
      fontWeight: "600"
    }
    
  
  });


  export default Wishlistview