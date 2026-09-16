import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, radius } from '../../app/theme/theme';
import type { Task, TaskCategory, TaskType } from '../../types/task';
import { taskCategoryLabels } from './taskData';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
};

const categories: TaskCategory[] = ['health', 'fitness', 'diet', 'sleep', 'study', 'work', 'life', 'custom'];
const repeatOptions: { value: TaskType; label: string }[] = [
  { value: 'one_off', label: '仅一次' },
  { value: 'daily', label: '每天' },
  { value: 'weekly', label: '每周' },
  { value: 'habit', label: '习惯' },
];

export function CreateTaskModal({ visible, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('life');
  const [type, setType] = useState<TaskType>('daily');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');

  const reset = () => {
    setTitle('');
    setCategory('life');
    setType('daily');
    setTarget('');
    setUnit('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const numericTarget = Number(target);
    onCreate({
      id: `custom-${Date.now()}`,
      title: cleanTitle,
      description: '由你创建的现实行动',
      category,
      type,
      expReward: 15,
      coinReward: 10,
      completed: false,
      target: Number.isFinite(numericTarget) && numericTarget > 0 ? numericTarget : undefined,
      current: Number.isFinite(numericTarget) && numericTarget > 0 ? 0 : undefined,
      unit: unit.trim() || undefined,
    });
    close();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backdrop} onPress={close} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>NEW ACTION</Text>
              <Text style={styles.title}>创造一个新行动</Text>
            </View>
            <Pressable onPress={close} style={styles.closeButton}><Text style={styles.closeText}>×</Text></Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>我想完成</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="例如：散步 30 分钟"
              placeholderTextColor="#B1A6A2"
              style={styles.input}
              autoFocus
            />

            <Text style={styles.label}>属于哪个领域</Text>
            <View style={styles.chips}>
              {categories.map(item => (
                <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>
                  <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{taskCategoryLabels[item]}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>重复方式</Text>
            <View style={styles.segment}>
              {repeatOptions.map(item => (
                <Pressable key={item.value} onPress={() => setType(item.value)} style={[styles.segmentItem, type === item.value && styles.segmentItemActive]}>
                  <Text style={[styles.segmentText, type === item.value && styles.segmentTextActive]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>目标（可选）</Text>
            <View style={styles.targetRow}>
              <TextInput
                value={target}
                onChangeText={setTarget}
                placeholder="30"
                placeholderTextColor="#B1A6A2"
                keyboardType="decimal-pad"
                style={[styles.input, styles.targetInput]}
              />
              <TextInput
                value={unit}
                onChangeText={setUnit}
                placeholder="分钟 / ml / 页"
                placeholderTextColor="#B1A6A2"
                style={[styles.input, styles.unitInput]}
              />
            </View>

            <View style={styles.rewardPreview}>
              <View>
                <Text style={styles.rewardEyebrow}>完成奖励</Text>
                <Text style={styles.rewardHint}>V1 暂由系统统一计算奖励</Text>
              </View>
              <Text style={styles.rewardValue}>+15 EXP  ·  +10 ✦</Text>
            </View>

            <Pressable onPress={submit} disabled={!title.trim()} style={[styles.submit, !title.trim() && styles.submitDisabled]}>
              <Text style={styles.submitText}>加入今日行动</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(39,31,30,0.28)' },
  sheet: { maxHeight: '88%', backgroundColor: '#FBF8F5', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 22, paddingBottom: 30 },
  handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#D8CFCA', alignSelf: 'center', marginTop: 10, marginBottom: 17 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  eyebrow: { color: colors.primary, fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: 4 },
  closeButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F0E9E5', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: colors.textSecondary, fontSize: 25, lineHeight: 27, fontWeight: '300' },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 9, marginTop: 5 },
  input: { minHeight: 52, borderRadius: radius.md, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8DFDA', paddingHorizontal: 15, color: colors.text, fontSize: 15, marginBottom: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E8DFDA' },
  chipActive: { backgroundColor: colors.primarySoft, borderColor: 'rgba(182,64,74,0.25)' },
  chipText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: colors.primary, fontWeight: '800' },
  segment: { flexDirection: 'row', padding: 4, borderRadius: 16, backgroundColor: '#EEE8E4', marginBottom: 20 },
  segmentItem: { flex: 1, minHeight: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  segmentItemActive: { backgroundColor: '#FFF' },
  segmentText: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
  segmentTextActive: { color: colors.text, fontWeight: '800' },
  targetRow: { flexDirection: 'row', gap: 10 },
  targetInput: { flex: 0.7 },
  unitInput: { flex: 1.3 },
  rewardPreview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: radius.md, backgroundColor: '#F2EDE2', marginBottom: 18 },
  rewardEyebrow: { color: colors.text, fontSize: 13, fontWeight: '800' },
  rewardHint: { color: colors.textSecondary, fontSize: 10, marginTop: 3 },
  rewardValue: { color: colors.gold, fontSize: 11, fontWeight: '800' },
  submit: { height: 54, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  submitDisabled: { opacity: 0.35 },
  submitText: { color: '#FFF', fontSize: 15, fontWeight: '800', letterSpacing: 0.5 },
});
