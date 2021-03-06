import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Main from './pages/Main';
import Form from './pages/Form';

function Routes() {
    return (
        <NavigationContainer>

            
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Contacts" component={Main} />
                <AppStack.Screen name="Form" component={Form} />
            </AppStack.Navigator>
        
        </NavigationContainer>

        );
}

export default Routes;