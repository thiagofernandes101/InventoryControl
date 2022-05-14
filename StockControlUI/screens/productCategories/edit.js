import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as productCategoryValidations from '../../validations/ProductionCategoryFieldsValidation';
import baseUrl from '../../services/baseApiUrl';

export default function EdityProductCategory({ navigation, route }) {
    const { id } = route.params;

    const [code, SetCode] = useState();
    const [description, SetDescription] = useState();
    const [reloadScreen, SetReloadScreen] = useState(true);

    useEffect(() => {
        LoadProductCategory();
    }, [reloadScreen]);

    async function LoadProductCategory() {
        if (reloadScreen) {
            await ProductCategory();
        }
    }

    async function ProductCategory() {
        let url = `${baseUrl}/category/details/${id}`;

        try {
            let result = await fetch(url);

            if (result.status == 200) {
                let productCategoryResponse = await result.json();

                SetCode(productCategoryResponse.code.toString());
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

    async function EditCategory() {
        let url = `${baseUrl}/category/edit/${code}`;

        let productCategoryView = {
            code: code,
            description: description
        }

        if (productCategoryValidations.IsValid(productCategoryView)) {
            try {
                let result = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productCategoryView)
                });

                if (result.status == 200) {
                    Alert.alert("Sucesso", `Requisição feita com sucesso.\nDeseja voltar para a tela principal?`, [
                        {
                            text: "Sim",
                            onPress: () => {
                                navigation.navigate("ProductsCategories");
                            }
                        },
                        {
                            text: "Não",
                            onPress: () => {
                                SetDescription("");
                            }
                        }
                    ])
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
                    ])
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
                ])
            }
        }
        else {
            Alert.alert("Erro", `Verifique se os campos obrigatórios código e descrição foram preenchidos corretamente.`, [
                {
                    text: "OK"
                }
            ])
        }
    }

    return (
        <View style={[styles.container]}>
            <View>
                <View style={[styles.titleGroup]}>
                    <Text style={[styles.title]}>Editar categoria</Text>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        onChangeText={(value) => SetCode(value)}
                        value={code}
                        editable={false}></TextInput>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        onChangeText={(value) => SetDescription(value)}
                        value={description}></TextInput>
                </View>
            </View>
            <View style={[styles.formGroupDirection]}>
                <Button title='Editar' color={"#008000"} onPress={() => EditCategory()}></Button>
                <Button title='Cancelar' color={"#FF0000"} onPress={() => navigation.navigate("ProductsCategories")}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 20
    },
    textInput: {
        borderBottomWidth: 1,
        padding: 5,
    },
    formGroupDirection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    formGroup: {
        marginBottom: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30
    },
    titleGroup: {
        marginBottom: 30,
        alignItems: 'center'
    }
})