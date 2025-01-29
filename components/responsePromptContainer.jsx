import { View, Text, Image,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
export default function ResponsePromptContainer({message}){
    return(
        <View style={styles.ResponsePromptContainerStyle}>
            <View style={styles.responseContainer}>{message}</View>
        </View>
    );
}
const styles = StyleSheet.create({
    ResponsePromptContainerStyle:{
        width: "100%",
        padding: 15,
        marginTop: 15
    },
    
});