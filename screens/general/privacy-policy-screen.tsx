import { ScrollView, View, StyleSheet, Text } from 'react-native';

function Privacy() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Introduction</Text>
          <Text style={styles.text}>
            At Expense Tracker, we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and share information about you when you use our mobile
            application. By using the App, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Information We Collect</Text>
          <Text style={styles.text}>
            When you create an account, we collect your email address and password. Your password is
            encrypted and we cannot view it.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>How We Use Your Information</Text>
          <Text style={styles.text}>
            To send you updates, security alerts, and administrative messages.
          </Text>
          <Text style={styles.text}>To respond to your inquiries or provide customer support.</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Data Security</Text>
          <Text style={styles.text}>
            We take your privacy seriously and implement reasonable security measures to protect
            your information. Passwords are encrypted, and all data transmissions are secured.
            However, no method of transmission over the internet or method of electronic storage is
            completely secure, so we cannot guarantee absolute security.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Data Retention</Text>
          <Text style={styles.text}>
            We retain your personal information only for as long as necessary to provide the App's
            services, comply with legal obligations, resolve disputes, and enforce our agreements.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Sharing of Information</Text>
          <Text style={styles.text}>
            We do not sell, trade, or rent your personal information to third parties.
          </Text>
          <Text style={styles.text}>
            We may disclose your information to comply with legal obligations, such as in response
            to a court order or other legal process.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Your Rights</Text>
          <Text style={styles.text}>Request a copy of the personal data we hold about you.</Text>
          <Text style={styles.text}>Request the correction of inaccurate or incomplete data.</Text>
          <Text style={styles.text}>
            Request the deletion of your personal data, where applicable.
          </Text>
          <Text style={styles.text}>
            If we are processing your personal data based on your consent, you can withdraw it at
            any time.
          </Text>
          <Text style={styles.text}>
            To exercise any of these rights, please contact us at support@jahbyte.com.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Children's Privacy</Text>
          <Text style={styles.text}>
            The App is not intended for use by individuals under the age of 13. We do not knowingly
            collect personal information from children under 13. If we discover that we have
            collected such information, we will take steps to delete it promptly.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Changes to This Privacy Policy</Text>
          <Text style={styles.text}>
            We may update this Privacy Policy from time to time. Any changes will be posted in the
            App, and the "Last Updated" date will be revised. Your continued use of the App after
            any changes constitutes your acceptance of the updated Privacy Policy.
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions or concerns about this Privacy Policy or our data practices,
            please contact us at: support@jahbyte.com.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Privacy;

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
