import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import IconButton from 'components/atoms/icon-button';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      className="h-full w-full"
      source={require('../../assets/images/background.jpg')}
      resizeMode="cover">
      <SafeAreaView className="flex-1 bg-black/50 p-4">
        <Text className="dark:text-neutral text-center text-4xl text-black">
          Take control of your expenses and build a better financial future. Manage, track, and save
          smarter with just a few taps.
        </Text>
        <View className="mt-auto gap-4">
          <IconButton
            title="SIGN UP"
            iconName="person"
            size="lg"
            onPress={() => navigation.navigate('Signup' as never)}
          />
          <IconButton
            title="LOGIN"
            iconName="power"
            size="lg"
            iconColor="red"
            onPress={() => navigation.navigate('Login' as never)}
          />
        </View>
        <Pressable className="mt-4">
          <Text className="dark:text-neutral text-center text-lg text-black">Privacy policy</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}
