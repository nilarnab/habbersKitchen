import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, Share, SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions, TouchableOpacity, Touchable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ sharable, pid }) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);


    useEffect(() => {
        loadFavoriteRecipes();
    }, []);


    const loadFavoriteRecipes = async () => {
        try {
            const savedRecipes = await AsyncStorage.getItem('@favoriteRecipes');
            if (savedRecipes !== null) {
                setFavoriteRecipes(JSON.parse(savedRecipes));
            }
        } catch (error) {
            console.log('Error loading favorite recipes:', error);
        }
    };

    const addFavoriteRecipe = async (recipeId) => {
        const updatedRecipes = [...favoriteRecipes, recipeId]
        setFavoriteRecipes(updatedRecipes);
        try {
            await AsyncStorage.setItem('@favoriteRecipes', JSON.stringify(updatedRecipes));
        } catch (error) {
            console.log('Error saving favorite recipes:', error);
        }
    };

    const removeFavoriteRecipe = async (recipeId) => {
        const updatedRecipes = favoriteRecipes.filter((id) => id !== recipeId);
        setFavoriteRecipes(updatedRecipes);
        try {
            await AsyncStorage.setItem('@favoriteRecipes', JSON.stringify(updatedRecipes));
        } catch (error) {
            console.log('Error saving favorite recipes:', error);
        }
    };

    const isFavoriteRecipe = (recipeId) => {
        return favoriteRecipes.includes(recipeId);
    };


    const navigation = useNavigation();
    return <>
        <View
            style={{
                height: 60,
                width: '100%',
                backgroundColor: COLOR2,
                flexDirection: 'row'
            }}>
            <View style={{
                width: '80%',
            }}>
                <TouchableOpacity style={{
                    width: 20,
                    marginLeft: 20,
                    marginTop: 20
                }} onPress={() => {
                    navigation.goBack()
                }}>
                    <Icon name='arrow-left' size={20} color={COLOR1} />
                </TouchableOpacity>

            </View>
            <View style={{
                width: '20%',
                flexDirection: 'row'
            }}>

                <TouchableOpacity style={{
                    width: '50%',
                    marginTop: 20,
                    marginRight: 30,
                    marginLeft: -30
                }} onPress={() => {
                    if (sharable) {
                        Share.share({
                            message:
                                sharable,
                        });
                    }
                }}>
                    <Icon name='share-alt' size={20} color={COLOR1} />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 20,
                    marginTop: 20,
                }}>
                    {
                        isFavoriteRecipe(pid) ? <Icon name='bookmark' size={20} color={COLOR1} onPress={() => { removeFavoriteRecipe(pid) }} /> : <Icon name='bookmark-o' size={20} color={COLOR1} onPress={() => { addFavoriteRecipe(pid) }} />
                    }
                </TouchableOpacity>

            </View>
        </View>
    </>

}