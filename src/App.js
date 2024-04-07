import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { COLORS } from './common/util';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';

function App({ navigation, route }) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? COLORS.black : COLORS.white,
        flex: 1,
    }

    return (<SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? COLORS.black : COLORS.white} />
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    </SafeAreaView>)
}

export default App;