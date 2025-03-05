import { View, Text, Image,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
export default function PromptComponent({promptText}){
    return(
        <View style={styles.promptStyle}>
            <View style={styles.titleContainer}><Text style={styles.title}>You</Text></View>
            <Text style={{color: 'white', fontSize: 15,fontWeight:'500'}}>{promptText}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    promptStyle:{
        borderRadius: 15,
        width: "50%",
        backgroundColor: 'blue',
        padding: 10,
        
        },
        title: {
            fontSize: 10,
            fontWeight: '300',
            color: 'white',
            marginBottom: 5
        }
});