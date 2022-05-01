import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as productCategoryValidations from '../../validations/ProductionCategoryFieldsValidation';

export default function CreateProductCategory({ navigation }) {
    const [code, setCode] = useState();
    const [description, setDescription] = useState();

    async function saveCategory() {
        let url = 'http://192.168.0.125:3000/api/category/new';

        let productCategoryView = {
            code: code,
            description: description
        }
        
        if (productCategoryValidations.IsValid(productCategoryView)) {
            try {
                let result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productCategoryView)
                });
    
                if (result.status == 200) {
                    Alert.alert("Sucesso", `Requisição feita com sucesso.\nDeseja cadastrar uma nova categoria?`, [
                        {
                            text: "Sim",
                            onPress: () => {
                                setCode("");
                                setDescription("");
                            }
                        },
                        {
                            text: "Não",
                            onPress: () => {
                                navigation.navigate("ProductsCategories");
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
                                setCode("");
                                setDescription("");
                            }
                        }
                    ])
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            Alert.alert("Erro", `Verifique se os campos obrigatórios código e descrição foram preenchidos corretamente`, [
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
                    <Text style={[styles.title]}>Nova categoria</Text>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        placeholder="Código (obrigatório)"
                        onChangeText={(value) => setCode(value)}
                        value={code}
                        keyboardType="numeric"></TextInput>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        placeholder="Descrição (obrigatório)"
                        onChangeText={(value) => setDescription(value)}
                        value={description}></TextInput>
                </View>
            </View>
            <View style={[styles.formGroupDirection]}>
                <Button title='Salvar' color={"#008000"} onPress={() => saveCategory()}></Button>
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