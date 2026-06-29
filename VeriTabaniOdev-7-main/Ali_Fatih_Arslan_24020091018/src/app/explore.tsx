import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: 80,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Keşfet</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            Bu başlangıç uygulaması, başlamanıza{'\n'}yardımcı olacak örnek kodlar içermektedir.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo Dokümantasyonu</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="Dosya tabanlı yönlendirme">
            <ThemedText type="small">
              Bu uygulamanın iki ekranı var: <ThemedText type="code">src/app/index.tsx</ThemedText> ve{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              <ThemedText type="code">src/app/_layout.tsx</ThemedText> dosyasındaki layout,
              sekme navigasyonunu yapılandırır.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Daha fazla bilgi</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS ve web desteği">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                Bu projeyi Android, iOS ve web üzerinde açabilirsiniz. Web sürümünü açmak için
                terminalde <ThemedText type="smallBold">w</ThemedText> tuşuna basın.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Görseller">
            <ThemedText type="small">
              Statik görseller için <ThemedText type="code">@2x</ThemedText> ve{' '}
              <ThemedText type="code">@3x</ThemedText> son eklerini kullanarak farklı
              ekran yoğunlukları için dosyalar sağlayabilirsiniz.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Daha fazla bilgi</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Açık ve koyu tema bileşenleri">
            <ThemedText type="small">
              Bu şablonda açık ve koyu tema desteği bulunmaktadır.{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook'u, kullanıcının
              mevcut renk şemasını kontrol etmenizi ve arayüz renklerini buna göre
              ayarlamanızı sağlar.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Daha fazla bilgi</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animasyonlar">
            <ThemedText type="small">
              Bu şablon, animasyonlu bir bileşen örneği içermektedir.{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> bileşeni,
              bu ipucunu açarken animasyon oluşturmak için güçlü{' '}
              <ThemedText type="code">react-native-reanimated</ThemedText> kütüphanesini kullanır.
            </ThemedText>
          </Collapsible>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
