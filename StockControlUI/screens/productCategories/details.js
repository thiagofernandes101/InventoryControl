import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import baseUrl from '../../services/baseApiUrl';

export default function CreateProductCategory({ navigation, route }) {
    const { id } = route.params;

    const [code, SetCode] = useState();
    const [description, SetDescription] = useState();
    const [reloadScreen, SetReloadScreen] = useState(true);

    useEffect(() => {
        LoadProductCategory();
    }, [reloadScreen]);

    async function LoadProductCategory() {
        if (reloadScreen) {
            await ProductCategoryDetails();
        }
    }

    async function ProductCategoryDetails() {
        let url = `${baseUrl}/category/details/${id}`;
        console.log(url);

        try {
            let result = await fetch(url);

            if (result.status == 200) {
                let productCategoryResponse = await result.json();

                SetCode(productCategoryResponse.code);
                SetDescription(productCategoryResponse.description);
                SetReloadScreen(false);
            }
            else {
                let errorMessage = await result.json();
                console.log(errorMessage.error);

                Alert.alert("Erro", `${errorMessage.error}`, [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate("ProductsCategories");
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
                        navigation.navigate("ProductsCategories");
                    }
                }
            ]);
        }
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.titleGroup]}>
                <Text style={[styles.title]}>Detalhes</Text>
            </View>
            <View style={[styles.formContainer, styles.card, styles.shadowComponent]}>
                <View style={[styles.formGroup]}>
                    <Text style={[styles.textForms]}>Código:</Text>
                    <Text style={[styles.textComponent]}>{code}</Text>
                </View>
                <View style={[styles.formGroup]}>
                    <Text style={[styles.textForms]}>Descrição:</Text>
                    <Text style={[styles.textComponent]}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textForms: {
        fontSize: 18,
        marginBottom: 5,
    },
    textComponent: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    textAreaInputComponent: {
        height: 60
    },
    formGroup: {
        marginBottom: 20
    },
    formContainer: {
        marginTop: 10,
        width: '80%'
    },
    shadowComponent: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 2,
    },
    card: {
        width: "80%",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    titleGroup: {
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    }
});