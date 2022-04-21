import {View, Text, StyleSheet} from 'react-native';

export default function ProductScreen() {
    return (
        <View style={styles.container}>
            <Text>Products categories</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});