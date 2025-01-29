import { View, Text, Image,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
export default function ResponseComponent({responseText}){
    return(
        <View style={styles.responseStyle}>
            <Image source={require('../assets/card_settings/robot.png')} style={{width: 20, height: 20,marginRight: 13 }}/>
            <Text style={{color: 'black', fontSize: 15,fontWeight:'400',lineHeight: 25}}>{responseText}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    responseStyle:{
        borderRadius: 15,
        width: "88%",
        backgroundColor: '#',
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 25,
        padding: 15,
        display: 'flex',
        flexDirection: 'row'
        
    }
});