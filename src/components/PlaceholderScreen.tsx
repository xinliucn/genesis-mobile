import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../app/theme/theme';
import { Screen } from './Screen';

export function PlaceholderScreen({ title, subtitle, symbol }: { title: string; subtitle: string; symbol: string }) {
  return (
    <Screen>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.card}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.cardText}>模块骨架已建立，下一阶段接入真实数据与交互。</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: spacing.xs },
  card: { marginTop: spacing.lg, minHeight: 220, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  symbol: { fontSize: 48 },
  cardText: { color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginTop: spacing.md },
});
