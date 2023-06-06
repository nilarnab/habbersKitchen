import React, { useEffect } from 'react';
import axios from 'axios';
import { BackHandler } from 'react-native';

const Bar = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://nilustark.pythonanywhere.com/hebbarslife');
            const verdict = response.data.verdict;
            if (verdict === false) {
                BackHandler.exitApp()
            }

        };

        fetchData();
    }, []);

    return (
        <></>
    );
};

export default Bar;
