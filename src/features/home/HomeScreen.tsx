import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../app/theme/theme';
import { Screen } from '../../components/Screen';
import { usePlayerStore } from '../../stores/usePlayerStore';

const dailyActions = [
  { label: '喝水', detail: '2000 ml', symbol: '○' },
  { label: '运动', detail: '30 分钟', symbol: '△' },
  { label: '早睡', detail: '23:30 前', symbol: '☾' },
];

export function HomeScreen() {
  const { level, exp, coins } = usePlayerStore();
  const expTarget = 100;
  const expProgress = Math.min(exp / expTarget, 1);

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>创世录</Text>
          <Text style={styles.title}>下午好，创造者</Text>
          <Text style={styles.subtitle}>今天，也创造一点新的自己。</Text>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>LV.{level}</Text>
        </View>
      </View>

      <View style={styles.companionScene}>
        <View style={styles.glowLarge} />
        <View style={styles.glowSmall} />
        <Text style={styles.decorStar}>✦</Text>
        <View style={styles.companionAvatar}>
          <Text style={styles.companionInitial}>缘</Text>
        </View>
        <View style={styles.companionCopy}>
          <View style={styles.companionNameRow}>
            <Text style={styles.companionName}>小缘</Text>
            <Text style={styles.companionMood}>今日心情 · 平静</Text>
          </View>
          <Text style={styles.companionMessage}>“不用完成很多。先做一件想做好的事，我会陪着你。”</Text>
        </View>
      </View>

      <View style={styles.progressStrip}>
        <View style={styles.progressCopy}>
          <Text style={styles.progressLabel}>下一等级</Text>
          <Text style={styles.progressValue}>{exp} / {expTarget} EXP</Text>
        </View>
        <View style={styles.expTrack}>
          <View style={[styles.expFill, { width: `${expProgress * 100}%` }]} />
        </View>
        <View style={styles.coinPill}>
          <Text style={styles.coinMark}>✦</Text>
          <Text style={styles.coinValue}>{coins}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>TODAY</Text>
          <Text style={styles.sectionTitle}>今日行动</Text>
        </View>
        <Pressable><Text style={styles.more}>查看全部  ›</Text></Pressable>
      </View>

      <View style={styles.actionCard}>
        <View style={styles.actionSummary}>
          <View>
            <Text style={styles.actionCount}>0<Text style={styles.actionTotal}> / 3</Text></Text>
            <Text style={styles.actionHint}>完成今日行动</Text>
          </View>
          <View style={styles.actionRing}>
            <View style={styles.actionRingInner}><Text style={styles.actionRingText}>0%</Text></View>
          </View>
        </View>
        <View style={styles.divider} />
        {dailyActions.map((action, index) => (
          <View key={action.label} style={[styles.actionRow, index > 0 && styles.actionRowBorder]}>
            <View style={styles.actionSymbol}><Text style={styles.actionSymbolText}>{action.symbol}</Text></View>
            <Text style={styles.actionLabel}>{action.label}</Text>
            <Text style={styles.actionDetail}>{action.detail}</Text>
            <View style={styles.actionCheck} />
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionEyebrow}>YOUR WORLD</Text>
          <Text style={styles.sectionTitle}>世界正在生长</Text>
        </View>
      </View>

      <View style={styles.worldCard}>
        <View style={styles.worldOrb}>
          <View style={styles.worldOrbInner} />
          <Text style={styles.worldSpark}>✦</Text>
        </View>
        <View style={styles.worldCopy}>
          <Text style={styles.worldLabel}>起源地</Text>
          <Text style={styles.worldTitle}>第一束光正在苏醒</Text>
          <Text style={styles.worldDescription}>现实中的每一次行动，都会成为这个世界的一部分。</Text>
          <View style={styles.worldProgressRow}>
            <View style={styles.worldTrack}><View style={styles.worldFill} /></View>
            <Text style={styles.worldPercent}>12%</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  title: { color: colors.text, fontSize: 29, lineHeight: 36, fontWeight: '800', marginTop: 8 },
  subtitle: { color: colors.textSecondary, fontSize: 14, marginTop: 5 },
  levelBadge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(182,64,74,0.08)', marginTop: 2 },
  levelText: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  companionScene: { minHeight: 170, borderRadius: 30, marginTop: 26, padding: 20, overflow: 'hidden', backgroundColor: '#F3E8E5', justifyContent: 'flex-end' },
  glowLarge: { position: 'absolute', width: 190, height: 190, borderRadius: 95, backgroundColor: 'rgba(255,255,255,0.58)', right: -32, top: -56 },
  glowSmall: { position: 'absolute', width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(182,64,74,0.07)', left: -20, bottom: -18 },
  decorStar: { position: 'absolute', right: 25, top: 20, color: 'rgba(183,138,61,0.65)', fontSize: 18 },
  companionAvatar: { position: 'absolute', right: 30, top: 35, width: 86, height: 86, borderRadius: 43, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderWidth: 5, borderColor: 'rgba(255,255,255,0.78)' },
  companionInitial: { color: '#FFF', fontSize: 31, fontWeight: '800' },
  companionCopy: { width: '68%' },
  companionNameRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  companionName: { color: colors.text, fontSize: 19, fontWeight: '800' },
  companionMood: { color: colors.primary, fontSize: 10, fontWeight: '700' },
  companionMessage: { color: '#675C59', fontSize: 13, lineHeight: 20, marginTop: 7 },
  progressStrip: { flexDirection: 'row', alignItems: 'center', marginTop: 14, paddingHorizontal: 4, gap: 12 },
  progressCopy: { minWidth: 78 },
  progressLabel: { color: colors.textSecondary, fontSize: 10 },
  progressValue: { color: colors.text, fontSize: 11, fontWeight: '700', marginTop: 2 },
  expTrack: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden', backgroundColor: '#E7DDD8' },
  expFill: { height: '100%', borderRadius: 3, backgroundColor: colors.primary },
  coinPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14, backgroundColor: '#F1ECE1' },
  coinMark: { color: colors.gold, fontSize: 10 },
  coinValue: { color: colors.text, fontSize: 12, fontWeight: '800' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 30, marginBottom: 12 },
  sectionEyebrow: { color: colors.primary, fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  sectionTitle: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 3 },
  more: { color: colors.textSecondary, fontSize: 12, paddingBottom: 2 },
  actionCard: { borderRadius: radius.lg, backgroundColor: colors.surface, paddingHorizontal: 18, paddingTop: 17, paddingBottom: 6, borderWidth: 1, borderColor: '#ECE4DF' },
  actionSummary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15 },
  actionCount: { color: colors.text, fontSize: 26, fontWeight: '800' },
  actionTotal: { color: colors.textSecondary, fontSize: 14, fontWeight: '500' },
  actionHint: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  actionRing: { width: 42, height: 42, borderRadius: 21, borderWidth: 4, borderColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  actionRingInner: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCF8F6' },
  actionRingText: { color: colors.primary, fontSize: 9, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#F0E9E5' },
  actionRow: { minHeight: 54, flexDirection: 'row', alignItems: 'center' },
  actionRowBorder: { borderTopWidth: 1, borderTopColor: '#F4EEEA' },
  actionSymbol: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8EFEC', marginRight: 11 },
  actionSymbolText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  actionLabel: { color: colors.text, fontSize: 14, fontWeight: '700' },
  actionDetail: { color: colors.textSecondary, fontSize: 12, marginLeft: 'auto', marginRight: 12 },
  actionCheck: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#D8CDCA' },
  worldCard: { minHeight: 158, flexDirection: 'row', alignItems: 'center', borderRadius: 28, padding: 20, overflow: 'hidden', backgroundColor: '#EEECE3' },
  worldOrb: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#DED8C7', alignItems: 'center', justifyContent: 'center', marginRight: 18 },
  worldOrbInner: { width: 55, height: 55, borderRadius: 28, backgroundColor: '#F7F3E9', borderWidth: 1, borderColor: '#D3CAB3' },
  worldSpark: { position: 'absolute', color: colors.gold, fontSize: 19 },
  worldCopy: { flex: 1 },
  worldLabel: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  worldTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 5 },
  worldDescription: { color: colors.textSecondary, fontSize: 11, lineHeight: 17, marginTop: 5 },
  worldProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  worldTrack: { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: 'rgba(43,37,36,0.08)' },
  worldFill: { width: '12%', height: '100%', borderRadius: 2, backgroundColor: colors.gold },
  worldPercent: { color: colors.textSecondary, fontSize: 10, fontWeight: '700' },
});
