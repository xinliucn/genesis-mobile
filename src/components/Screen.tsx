import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../app/theme/theme';

type Props = PropsWithChildren<{ scroll?: boolean; contentStyle?: ViewStyle }>;

export function Screen({ children, scroll = true, contentStyle }: Props) {
  if (!scroll) {
    return <SafeAreaView style={[styles.container, contentStyle]}>{children}</SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, contentStyle]} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
});
