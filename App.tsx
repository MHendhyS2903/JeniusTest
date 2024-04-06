import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DimWidth} from './app/helpers/size';

import Contact from './app/views/contact';
import ContactDetail from './app/views/contact-detail';
import Contactupdate from './app/views/contact-update';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Contact">
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              headerTitle: 'Contacts',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: '500',
                fontSize: DimWidth(6),
                color: 'white',
              },
              headerStyle: {
                backgroundColor: '#2596be',
              },
            }}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetail}
            options={{
              headerTitle: '',
              headerTransparent: true,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ContactUpdate"
            component={Contactupdate}
            options={{
              headerTitle: '',
              headerTitleAlign: 'center',
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
