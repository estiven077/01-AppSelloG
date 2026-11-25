import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  topHeader: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  headerImage: {
    transform: [{ scale: 1.15 }, { translateX: 25 }],
  },
  welcomeTextContainer: {
    maxWidth: '65%',
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  welcomeSubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  svgContainer: {
    width: '100%',
    height: 50,
    marginTop: -50,
    marginBottom: -1,
    position: 'relative',
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderRadius: 16,
  },
  roleTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 8,
  },
  roleSubtitle: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  group: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#E11D48',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 14,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pickerIcon: {
    marginLeft: 16,
    marginRight: 3,
  },
  picker: {
    flex: 1,
    height: 52,
  },
  error: {
    color: '#E11D48',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  errorTerminos: {
    marginTop: -16,
    marginBottom: 16,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderRadius: 11,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  registerButton: {
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginTop: 24,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    marginRight: 6,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});

export default styles;