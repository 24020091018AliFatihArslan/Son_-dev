# Günün Mesajı - Firebase 🔥

**Ali Fatih Arslan** | 24020091018 | Veri Tabanı Yönetim Sistemleri - Ödev 7

React Native (Expo) ve Firebase Firestore kullanılarak geliştirilmiş, gerçek zamanlı CRUD uygulaması.

## Başlangıç

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Uygulamayı başlatın:

   ```bash
   npx expo start
   ```

3. Android emülatörde çalıştırın:

   ```bash
   npx expo start --android
   ```

## Firebase Yapılandırması

Firebase Firestore yapılandırması `src/firebaseConfig.js` dosyasındadır.  
Firestore'da `messages` koleksiyonu kullanılmaktadır.

## Uygulama Özellikleri

- ✅ **Ekleme (Create):** Yeni mesaj ekleme
- ✅ **Okuma (Read):** Gerçek zamanlı mesaj listesi
- ✅ **Güncelleme (Update):** Mevcut mesajı düzenleme
- ✅ **Silme (Delete):** Mesaj silme
- ✅ **Gerçek Zamanlı:** `onSnapshot` ile anlık senkronizasyon

## Teknoloji Yığını

- React Native & Expo (Expo Router)
- Firebase Firestore (NoSQL)
- TypeScript
- react-native-safe-area-context
