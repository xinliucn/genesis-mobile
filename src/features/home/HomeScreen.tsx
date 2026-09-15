import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radius, spacing } from '../../app/theme/theme';
import { usePlayerStore } from '../../stores/usePlayerStore';

export function HomeScreen() {
  const { level, exp, coins } = usePlayerStore();

  return (
    <Screen>
      <Text style={styles.eyebrow}>创世录 · CREATE YOUR WORLD</Text>
      <Text style={styles.title}>下午好，创造者</Text>
      <Text style={styles.subtitle}>每一次行动，都在创造新的自己。</Text>

      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.avatarText}>缘</Text></View>
        <View style={styles.heroText}>
          <Text style={styles.companion}>小缘</Text>
          <Text style={styles.message}>今天完成一个小目标，就会让世界向前生长一点。</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Stat label="等级" value={`Lv.${level}`} />
        <Stat label="经验" value={`${exp} EXP`} />
        <Stat label="创世币" value={`${coins}`} />
      </View>

      <Text style={styles.sectionTitle}>今日行动</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>今日进度 · 0 / 3</Text>
        <Text style={styles.cardText}>喝水 2000ml · 运动 30 分钟 · 23:30 前入睡</Text>
      </View>

      <Text style={styles.sectionTitle}>世界正在生长</Text>
      <View style={styles.worldCard}>
        <Text style={styles.cardTitle}>起源地 · 12%</Text>
        <Text style={styles.cardText}>完成现实行动，积累世界能量并解锁新的区域。</Text>
      </View>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.sm },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: spacing.xs },
  hero: { backgroundColor: colors.primarySoft, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: '800' },
  heroText: { flex: 1, marginLeft: spacing.md },
  companion: { color: colors.text, fontSize: 18, fontWeight: '800' },
  message: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: spacing.xs },
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  stat: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  statValue: { color: colors.text, fontWeight: '800', fontSize: 16 },
  statLabel: { color: colors.textSecondary, fontSize: 12, marginTop: spacing.xs },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  worldCard: { backgroundColor: '#F0EEE5', borderRadius: radius.md, padding: spacing.md },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  cardText: { color: colors.textSecondary, lineHeight: 21, marginTop: spacing.sm },
});
