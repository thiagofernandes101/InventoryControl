import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation></Navigation>
      <StatusBar></StatusBar>
    </SafeAreaProvider>
  )
}
