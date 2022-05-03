import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import baseUrl from '../../services/baseApiUrl';
import FontAwesomeIcon from '../../helpers/icons/FontawesomeIcons';

export default function ProductCategoryScreen({ navigation }) {
  const [productCategories, SetProductCategories] = useState([]);
  const [reloadScreen, SetReloadScreen] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => SetReloadScreen(!reloadScreen));
    LoadProductCategories();
  }, [reloadScreen]);

  async function LoadProductCategories() {
    if (reloadScreen) {
      await GetAllRecords();
    }
  }

  async function GetAllRecords() {
    let url = `${baseUrl}/category/all/records`;

    try {
      let result = await fetch(url);

      if (result.status == 200) {
        let productCategoriesResponse = await result.json();

        SetProductCategories(productCategoriesResponse);
        SetReloadScreen(false);
      }
      else {
        let errorMessage = await result.json();

        Alert.alert("Erro", `${errorMessage.error}`, [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate('Products');
            }
          }
        ]);
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert("Erro", `Ocorreu um erro inesperado.\nVerifique o arquivo de log.`, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('Products');
          }
        }
      ]);
    }
  }

  function NotificationOfRemovalOfAProductCategory(code) {
    console.log(`Código: ${code}`);
    
    Alert.alert("Alerta", `Realmente deseja excluir a categoria de código ${code}`, [
      {
        text: "Sim",
        onPress: () => {
          RemoveProductCategory(code);
          SetReloadScreen(true);
        }
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ]);
  }

  async function RemoveProductCategory(code) {
    let url = `${baseUrl}/category/delete/${code}`;
    
    try {
      let result = await fetch(url, {
        method: 'DELETE'
      });

      if (result.status == 200) {
        let productCategoriesResponse = await result.json();

        Alert.alert("Alerta", `O produto com o código de categoria ${productCategoriesResponse.code} foi excluído com sucesso`, [
          {
            text: "OK"
          }
        ]);
      }
      else {
        let errorMessage = await result.json();

        Alert.alert("Erro", `${errorMessage.error}`, [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate('Products');
            }
          }
        ]);
      }
    }
    catch (error) {
      console.log(error);
      Alert.alert("Erro", `Ocorreu um erro inesperado.\nVerifique o arquivo de log.`, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('Products');
          }
        }
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={[styles.newActivityTypeButton, styles.shadowComponent]}
        onPress={() => navigation.navigate("CreateProductCategory")}>
        <Text style={styles.buttonText}>Nova categoria</Text>
      </Pressable>

      <View style={styles.container}>
        <ScrollView style={[styles.scrollWholeScreenWidth]}>
          {
            productCategories.map((productCategories, index) => (
              <View style={[styles.card, styles.shadowComponent]} key={index.toString()}>
                <Text style={styles.activityTypeMainText}>{productCategories.code}</Text>
                <Text style={styles.activityTypeDescriptionText}>{productCategories.description}</Text>

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
  activityTypeMainText: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18
  },
  activityTypeDescriptionText: {
    marginBottom: 5
  },
  scrollWholeScreenWidth: {
    width: "80%",
  }
});