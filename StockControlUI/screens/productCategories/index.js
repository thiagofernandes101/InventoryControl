import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProductCategoryScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Products categories</Text>
      <Button title="Nova categoria" onPress={() => navigation.navigate("CreateProductCategory")}></Button>
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