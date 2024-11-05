import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import useLocationStore from '../stores/location_store';

const useLocation = () => {
    const [errMsg, setErrMsg] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const permissionNotGranted = useLocationStore((state) => state.notGrantPermission);
    const permissionGranted = useLocationStore((state) => state.grantPermission);
    const getUserLocation = async () =>{
        //If user does not grant permission
        try{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrMsg('not granted!');
                //set is permission granted to false
                permissionNotGranted();
                console.log('Permission is not granted from the hook');
            }else if (status === 'granted'){
                setErrMsg('granted');
                //set is permission granted to true
                permissionGranted();
                console.log('Permission is granted from the hook');
            }

            
            //If user grands us permission
            let {coords} = await Location.getCurrentPositionAsync();
            if ({coords}){
                const {latitude, longitude} = coords;
                console.log("lat and long is: ", latitude, longitude);
                setLatitude(latitude);
                setLongitude(longitude);
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                });
                console.log("User Location: ",response);
            } 
        }catch(err){
            console.log('inside err')
            console.log(err);
            setErrMsg('not granted');
        }
        
    }
    useEffect(()=>{
        getUserLocation();
    }, []);
    return {latitude, longitude, errMsg};
}

export default useLocation

const styles = StyleSheet.create({})