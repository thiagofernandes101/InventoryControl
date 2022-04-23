import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import FontAwesomeIcon from '../../helpers/icons/fontawesomeIcons';

export default function CreateProductCategory({ navigation }) {
    return (
        <View style={[styles.container]}>
            <View>
                <View style={[styles.titleGroup]}>
                    <Text style={[styles.title]}>Nova categoria</Text>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        placeholder="Código"></TextInput>
                </View>
                <View style={[styles.formGroup]}>
                    <TextInput
                        style={[styles.textInput]}
                        placeholder="Descrição"></TextInput>
                </View>
            </View>
            <View style={[styles.formGroupDirection]}>
                <Button title='Salvar' color={"#008000"} onPress={() => navigation.navigate("Products")}></Button>
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