import { NavigationHeader } from 'components';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsAndConditionsScreen() {
  return (
    <View className="flex flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Terms & conditions" />
      <SafeAreaView className="flex-1 p-2">
        <ScrollView>
          <View className="gap-8">
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Introduction</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                Welcome to Planary. By downloading, installing, and using our application, you agree
                to be bound by these Terms and Conditions. If you do not agree with these Terms, you
                should not use the App.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Description of Service
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                Planary is an expense management application that allows users to track and manage
                their expenses. It is provided by Jahbyte Technologies
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">User Account</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                To use certain features of the App, you may be required to create an account by
                providing your email and password. You are responsible for maintaining the
                confidentiality of your login information and for all activities that occur under
                your account.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                User Responsibilities
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                You agree to use the App only for lawful purposes.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                You must not misuse the App by introducing viruses, malware, or any other harmful
                material.
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                You are responsible for ensuring the accuracy of any information you input into the
                App, including expense details.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Data Collection and Privacy
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We value your privacy. By using the App, you agree to our collection and use of
                certain personal data, as outlined in our Privacy Policy. We do not collect
                financial data such as bank details or payment card information. User-provided data,
                such as email addresses and passwords, are encrypted and stored securely.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                {' '}
                Intellectual Property
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                All content, features, and functionality of the App, including but not limited to
                design, text, graphics, logos, and software, are the intellectual property of
                Jahbyte Technologies or its licensors. Unauthorized use is strictly prohibited.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">
                Limitation of Liability
              </Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We strive to ensure that the App operates effectively and securely, but we do not
                guarantee that the App will be error-free or available at all times. To the extent
                permitted by law, Expense Tracker will not be liable for any direct, indirect,
                incidental, or consequential damages arising out of the use of or inability to use
                the App.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Termination</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We reserve the right to terminate or suspend your account at any time, with or
                without notice, if you violate these Terms or engage in unlawful activity.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Changes to Terms</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                We may modify these Terms at any time. Any changes will be effective when we post
                the updated Terms within the App. Your continued use of the App after such changes
                means that you accept the modified Terms.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Governing Law</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                These Terms are governed by and construed in accordance with the laws of Nigeria,
                without regard to its conflict of law provisions.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-lg text-gray-900 dark:text-text-dark">Contact Information</Text>
              <Text className="text-sm text-gray-900 dark:text-text-dark">
                If you have any questions or concerns regarding these Terms, you can contact us at:
                support@jahbyte.com.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
