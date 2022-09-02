import { theme } from './theme';

const text = {
  fontFamily: theme.fonts.primary,
  fontSize: theme.fontSizes.xs,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.grayDarker,
  margin: 0,
};
const textError = {
  ...text,
  color: theme.colors.error,
};
const textWarning = {
  ...text,
  color: theme.colors.warning,
};
const textSuccess = {
  ...text,
  color: theme.colors.success,
};
const header = {
  ...text,
  fontSize: theme.fontSizes.lg,
  color: theme.colors.primary,
};
const title = {
  ...text,
  fontSize: theme.fontSizes.md,
  color: theme.colors.primaryDark,
};

const defaultButton = {
  fontFamily: theme.fonts.primary,
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.light,
  padding: theme.space.sm,
  backgroundColor: theme.colors.primary,
  borderRadius: theme.space.sm,
  boxShadow: theme.boxShadow(theme.colors.primary, '19'),
  cursor: 'pointer',
};
const lightButton = {
  ...defaultButton,
  backgroundColor: theme.colors.light,
  color: theme.colors.primary,
};
const outlineButton = {
  ...defaultButton,
  backgroundColor: 'transparent',
  border: `1px solid ${theme.colors.primary}`,
};

const defaultBadge = {
  fontSize: theme.fontSizes.xs,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.grayDarker,
  backgroundColor: theme.colors.grayLight,
  borderRadius: theme.space.md,
  padding: theme.space.sm,
};
const primaryBadge = {
  ...defaultBadge,
  color: theme.colors.light,
  backgroundColor: theme.colors.primary,
};
const successBadge = {
  ...defaultBadge,
  color: theme.colors.successLight,
  backgroundColor: theme.colors.success,
};
const warningBadge = {
  ...defaultBadge,
  color: theme.colors.warningLight,
  backgroundColor: theme.colors.warning,
};
const errorBadge = {
  ...defaultBadge,
  color: theme.colors.errorLight,
  backgroundColor: theme.colors.error,
};

const defaultInput = {
  fontFamily: theme.fonts.primary,
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.grayDarker,
  backgroundColor: theme.colors.light,
  borderRadius: theme.space.xs,
  border: `1px solid ${theme.colors.grayLight}`,
  padding: theme.space.sm,
};

const inputLabel = {
  fontFamily: theme.fonts.primary,
  fontSize: theme.fontSizes.sm,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.primaryDark,
  marginBottom: theme.space.xs,
};
const roundIcon = {
  width: 40,
  height: 40,
  borderRadius: 40,
  backgroundColor: '#fff',
  margin: 10,
  alignItems: 'center',
  justifyContent: 'center',
};

export const sharedStyle = {
  text,
  textError,
  textWarning,
  textSuccess,
  header,
  title,
  defaultButton,
  lightButton,
  outlineButton,
  defaultBadge,
  primaryBadge,
  successBadge,
  warningBadge,
  errorBadge,
  defaultInput,
  inputLabel,
  roundIcon,
};

export default sharedStyle;
