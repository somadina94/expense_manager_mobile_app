import { ScrollView, View, Text } from 'react-native';
import { NavigationHeader } from 'components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  return (
    <View className="flex flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Privacy policy" />
      <SafeAreaView className="flex-1 p-2">
        <ScrollView>
          <View className="gap-8">
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Introduction</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                At Planary, we are committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, and share information about you when you use our
                mobile application. By using the App, you agree to the collection and use of
                information in accordance with this Privacy Policy.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Information We Collect
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                When you create an account, we collect your email address and password. Your
                password is encrypted and we cannot view it.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                How We Use Your Information
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                To send you updates, security alerts, and administrative messages.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                To respond to your inquiries or provide customer support.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Data Security</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We take your privacy seriously and implement reasonable security measures to protect
                your information. Passwords are encrypted, and all data transmissions are secured.
                However, no method of transmission over the internet or method of electronic storage
                is completely secure, so we cannot guarantee absolute security.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Data Retention</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We retain your personal information only for as long as necessary to provide the
                App&apos;s services, comply with legal obligations, resolve disputes, and enforce
                our agreements.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Sharing of Information
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We do not sell, trade, or rent your personal information to third parties.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We may disclose your information to comply with legal obligations, such as in
                response to a court order or other legal process.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Your Rights</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                Request a copy of the personal data we hold about you.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                Request the correction of inaccurate or incomplete data.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                Request the deletion of your personal data, where applicable.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                If we are processing your personal data based on your consent, you can withdraw it
                at any time.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                To exercise any of these rights, please contact us at support@jahbyte.com.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Children&apos;s Privacy
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                The App is not intended for use by individuals under the age of 13. We do not
                knowingly collect personal information from children under 13. If we discover that
                we have collected such information, we will take steps to delete it promptly.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Changes to This Privacy Policy
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We may update this Privacy Policy from time to time. Any changes will be posted in
                the App, and the &quot;Last Updated&quot; date will be revised. Your continued use
                of the App after any changes constitutes your acceptance of the updated Privacy
                Policy.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Contact Us</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                If you have any questions or concerns about this Privacy Policy or our data
                practices, please contact us at: support@jahbyte.com.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
