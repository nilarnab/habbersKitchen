import React, { useEffect } from 'react';
import axios from 'axios';
import { Alert, BackHandler } from 'react-native';

const Bar = () => {
    useEffect(() => {
        const fetchData = async () => {
            console.log("checking if kill switch is on")

            try {
                const response = await axios.get('https://nilustark.pythonanywhere.com/hebbarslife');
                const verdict = response.data.verdict;
                if (verdict === false) {
                    Alert.alert("Access revoked", "The access of the application has been revoked. The app will exit in 3 seconds")
                    timeBomb()
                }
            }
            catch (erro) {
                Alert.alert("Kill Switch Error", "Error fetching if kill switch is enabled, killing app in 3 seconds")
                timeBomb()
            }


        };

        fetchData();
    }, []);


    const timeBomb = () => {
        setInterval(() => {
            BackHandler.exitApp();
        }, 3000)
    }

    return (
        <></>
    );
};

export default Bar;
