/**
 * Uygulamada kullanılan renkler aşağıda tanımlanmıştır. Renkler açık ve koyu mod için ayrı ayrı belirlenmiştir.
 * Uygulamanızı stillendirmenin birçok farklı yolu vardır. Örneğin, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), vb.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1E1B4B',
    background: '#F5F3FF',
    backgroundElement: '#EDE9FE',
    backgroundSelected: '#DDD6FE',
    textSecondary: '#6B7280',
  },
  dark: {
    text: '#E8EAFF',
    background: '#0B0F1E',
    backgroundElement: '#141832',
    backgroundSelected: '#1E2248',
    textSecondary: '#A78BFA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
