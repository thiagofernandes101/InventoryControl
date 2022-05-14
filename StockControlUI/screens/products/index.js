import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import baseUrl from '../../services/baseApiUrl';
import FontAwesomeIcon from '../../helpers/icons/FontawesomeIcons';

export default function ProductScreen({ navigation }) {
  const [products, SetProducts] = useState([]);
  const [reloadScreen, SetReloadScreen] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => SetReloadScreen(!reloadScreen));
    LoadProducts();
  }, [reloadScreen]);

  async function LoadProducts() {
    if (reloadScreen) {
      await GetAllRecords();
    }
  }

  async function GetAllRecords() {
    let url = `${baseUrl}/products/all/records`;

    try {
      let result = await fetch(url);

      if (result.status == 200) {
        let productsResponse = await result.json();

        SetProducts(productsResponse);
        SetReloadScreen(false);
      }
      else {
        let errorMessage = await result.json();

        Alert.alert("Erro", `${errorMessage.error}`, [
          {
            text: "OK"
          }
        ])
      }
    }
    catch (error) {
      Alert.alert("Erro", `Ocorreu um erro inesperado.\nVerifique o arquivo de log.`, [
        {
          text: "OK"
        }
      ])
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.newActivityTypeButton, styles.shadowComponent]}
        onPress={() => Alert.alert("Botão para criar um novo produto")}>
        <Text style={styles.buttonText}>Novo produto</Text>
      </Pressable>

      <View style={styles.container}>
        <ScrollView style={[styles.scrollWholeScreenWidth]}>
          {
            products.map((productCategories, index) => (
              <View style={[styles.card, styles.shadowComponent]} key={index.toString()}>
                <Text style={styles.mainText}>{productCategories.code}</Text>
                <Text style={styles.descriptionText}>{productCategories.description}</Text>

                <View style={[styles.cardActionComponentDirection]}>
                  <Pressable style={[styles.cardActionButton, styles.editActivityTypeButton, styles.shadowComponent]}
                    onPress={() => navigation.navigate('EdityProductCategory', { id: productCategories.code })}>
                    <Text style={styles.buttonText}>
                      <FontAwesomeIcon name="edit" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>

                  <Pressable style={[styles.cardActionButton, styles.deleteActivityTypeButton, styles.shadowComponent]}
                    onPress={() => NotificationOfRemovalOfAProductCategory(productCategories.code)}>
                    <Text style={styles.buttonText}>
                      <FontAwesomeIcon name="remove" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>

                  <Pressable style={[styles.cardActionButton, styles.infoActivityTypeButton, styles.shadowComponent]}
                    onPress={() => navigation.navigate('ProductCategoryDetails', { id: productCategories.code })}>
                    <Text style={styles.buttonText}>
                      <FontAwesomeIcon name="info-circle" size={20} color="#FFFFFF" />
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  newActivityTypeButton: {
    backgroundColor: "#0085FC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    width: "80%"
  },
  shadowComponent: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 2,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardActionComponentDirection: {
    flexDirection: "row"
  },
  cardActionButton: {
    padding: 10,
    borderRadius: 10,
    width: "15%",
    marginTop: 10,
  },
  editActivityTypeButton: {
    backgroundColor: "#0085FC",
  },
  deleteActivityTypeButton: {
    backgroundColor: "#E51400",
    marginLeft: 10
  },
  infoActivityTypeButton: {
    backgroundColor: "#1CA5B8",
    marginLeft: 10
  },
  mainText: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18
  },
  descriptionText: {
    marginBottom: 5
  },
  scrollWholeScreenWidth: {
    width: "80%",
  }
});