import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, SIZES } from '../constants';
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn} from '../components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Welcome from '../components/home/welcome/Welcome';

const Home = () =>{
    const router = useRouter();

    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft: () =>{
                    },
                    headerRight: () =>{
                    },
                    headerTitle:""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                style={{
                    flex:1, 
                    padding:SIZES.medium
                }}>
                {/* <Welcome/> */}
                <Popularjobs/>
                <Nearbyjobs/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home;