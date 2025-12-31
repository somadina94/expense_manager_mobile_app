import { View, StyleSheet, Text, ScrollView } from 'react-native';

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.text}>
            Welcome to Expense Tracker. By downloading, installing, and using our application, you
            agree to be bound by these Terms and Conditions. If you do not agree with these Terms,
            you should not use the App.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Description of Service</Text>
          <Text style={styles.text}>
            Expense Tracker is an expense management application that allows users to track and
            manage their expenses. It is provided by Jahbyte Technologies
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>User Account</Text>
          <Text style={styles.text}>
            To use certain features of the App, you may be required to create an account by
            providing your email and password. You are responsible for maintaining the
            confidentiality of your login information and for all activities that occur under your
            account.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>User Responsibilities</Text>
          <Text style={styles.text}>You agree to use the App only for lawful purposes.</Text>
          <Text style={styles.text}>
            You must not misuse the App by introducing viruses, malware, or any other harmful
            material.
          </Text>
          <Text style={styles.text}>
            You are responsible for ensuring the accuracy of any information you input into the App,
            including expense details.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Data Collection and Privacy</Text>
          <Text style={styles.text}>
            We value your privacy. By using the App, you agree to our collection and use of certain
            personal data, as outlined in our Privacy Policy. We do not collect financial data such
            as bank details or payment card information. User-provided data, such as email addresses
            and passwords, are encrypted and stored securely.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}> Intellectual Property</Text>
          <Text style={styles.text}>
            All content, features, and functionality of the App, including but not limited to
            design, text, graphics, logos, and software, are the intellectual property of Jahbyte
            Technologies or its licensors. Unauthorized use is strictly prohibited.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Limitation of Liability</Text>
          <Text style={styles.text}>
            We strive to ensure that the App operates effectively and securely, but we do not
            guarantee that the App will be error-free or available at all times. To the extent
            permitted by law, Expense Tracker will not be liable for any direct, indirect,
            incidental, or consequential damages arising out of the use of or inability to use the
            App.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Termination</Text>
          <Text style={styles.text}>
            We reserve the right to terminate or suspend your account at any time, with or without
            notice, if you violate these Terms or engage in unlawful activity.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Changes to Terms</Text>
          <Text style={styles.text}>
            We may modify these Terms at any time. Any changes will be effective when we post the
            updated Terms within the App. Your continued use of the App after such changes means
            that you accept the modified Terms.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Governing Law</Text>
          <Text style={styles.text}>
            These Terms are governed by and construed in accordance with the laws of Nigeria,
            without regard to its conflict of law provisions.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions or concerns regarding these Terms, you can contact us at:
            support@jahbyte.com.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 16,
    padding: 10,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  text: {
    fontSize: 12,
  },
});
