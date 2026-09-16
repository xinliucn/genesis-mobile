import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../app/theme/theme';
import { Screen } from '../../components/Screen';
import { usePlayerStore } from '../../stores/usePlayerStore';
import type { Task, TaskCategory } from '../../types/task';
import { starterTasks, taskCategoryLabels } from './taskData';

type Filter = 'all' | TaskCategory;
const filters: Filter[] = ['all', 'health', 'fitness', 'diet', 'sleep', 'study', 'work', 'life'];

export function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [filter, setFilter] = useState<Filter>('all');
  const grantReward = usePlayerStore(state => state.grantReward);

  const visibleTasks = useMemo(
    () => (filter === 'all' ? tasks : tasks.filter(task => task.category === filter)),
    [filter, tasks],
  );
  const completedCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length ? completedCount / tasks.length : 0;

  const completeTask = (task: Task) => {
    if (task.completed) return;
    setTasks(current => current.map(item =>
      item.id === task.id ? { ...item, completed: true, current: item.target ?? item.current } : item,
    ));
    grantReward(task.expReward, task.coinReward);
  };

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>TODAY · 今日行动</Text>
          <Text style={styles.title}>今天想让世界成长一点吗？</Text>
          <Text style={styles.subtitle}>完成现实中的小行动，积累属于你的成长。</Text>
        </View>
        <Pressable style={styles.addButton}><Text style={styles.addButtonText}>＋</Text></Pressable>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.progressTitle}>今日进度</Text>
          <Text style={styles.progressValue}>{completedCount} / {tasks.length}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressHint}>
          {completedCount === tasks.length ? '今天的行动已经全部完成 ✦' : '不用一次完成很多，先完成一个就好。'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map(item => {
          const active = item === filter;
          return (
            <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filterChip, active && styles.filterChipActive]}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{taskCategoryLabels[item]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.rowBetween, styles.sectionHeader]}>
        <Text style={styles.sectionTitle}>今日任务</Text>
        <Text style={styles.sectionMeta}>{visibleTasks.length} 项</Text>
      </View>

      <View style={styles.taskList}>
        {visibleTasks.map(task => (
          <Pressable key={task.id} onPress={() => completeTask(task)} style={[styles.taskCard, task.completed && styles.taskCardCompleted]}>
            <View style={[styles.check, task.completed && styles.checkCompleted]}>
              <Text style={styles.checkMark}>{task.completed ? '✓' : ''}</Text>
            </View>
            <View style={styles.taskContent}>
              <View style={styles.taskTitleRow}>
                <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>{task.title}</Text>
                <Text style={styles.category}>{taskCategoryLabels[task.category]}</Text>
              </View>
              <Text style={styles.taskDescription}>{task.description}</Text>
              <View style={styles.rewardRow}>
                <Text style={styles.expReward}>+{task.expReward} EXP</Text>
                <Text style={styles.coinReward}>+{task.coinReward} 创世币</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.createTaskButton}>
        <Text style={styles.createTaskIcon}>＋</Text>
        <View style={styles.createCopy}>
          <Text style={styles.createTaskTitle}>创建自己的任务</Text>
          <Text style={styles.createTaskSubtitle}>把你真正想坚持的事情加入创世录</Text>
        </View>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 },
  headerCopy: { flex: 1 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8 },
  title: { color: colors.text, fontSize: 28, lineHeight: 36, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 7 },
  addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  addButtonText: { color: '#FFF', fontSize: 28, lineHeight: 30, fontWeight: '300' },
  progressCard: { marginTop: 24, padding: 20, borderRadius: radius.lg, backgroundColor: colors.primarySoft },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  progressValue: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(182,64,74,0.12)', overflow: 'hidden', marginTop: 15 },
  progressFill: { height: '100%', borderRadius: 4, backgroundColor: colors.primary },
  progressHint: { color: colors.textSecondary, fontSize: 13, marginTop: 12 },
  filters: { gap: 8, paddingVertical: 22, paddingRight: 20 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '800' },
  sectionMeta: { color: colors.textSecondary, fontSize: 13 },
  taskList: { gap: 12 },
  taskCard: { flexDirection: 'row', padding: 17, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  taskCardCompleted: { opacity: 0.66, backgroundColor: '#FAF7F4' },
  check: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: '#CFC3BE', alignItems: 'center', justifyContent: 'center', marginRight: 13, marginTop: 1 },
  checkCompleted: { backgroundColor: colors.success, borderColor: colors.success },
  checkMark: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  taskContent: { flex: 1 },
  taskTitleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  taskTitle: { flex: 1, color: colors.text, fontSize: 16, lineHeight: 22, fontWeight: '700' },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: colors.textSecondary },
  category: { color: colors.primary, fontSize: 11, fontWeight: '700', backgroundColor: colors.primarySoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, overflow: 'hidden' },
  taskDescription: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 5 },
  rewardRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  expReward: { color: colors.success, fontSize: 12, fontWeight: '700' },
  coinReward: { color: colors.gold, fontSize: 12, fontWeight: '700' },
  createTaskButton: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 18, padding: 18, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(255,255,255,0.55)' },
  createTaskIcon: { color: colors.primary, fontSize: 28, fontWeight: '300' },
  createCopy: { flex: 1 },
  createTaskTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  createTaskSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
});
