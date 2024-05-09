import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler"

import Routers from './routers/Routers';
import { MycontextControllerProvider } from '../store';
const App = () => {
  return (
    <MycontextControllerProvider>
    <Routers/>
    </MycontextControllerProvider>
  )
}
export default App;
