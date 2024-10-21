import CardSettings from "./CardSettings";
import UpdatePin from "./UpdatePin";

// Inside your Stack Navigator
<Stack.Navigator initialRouteName="CardSettings">
  <Stack.Screen name="CardSettings" component={CardSettings} />
  <Stack.Screen name="UpdatePin" component={UpdatePin} options={{ title: 'Update PIN' }} />
</Stack.Navigator>


