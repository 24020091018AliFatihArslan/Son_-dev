# 📋 Veri Tabanı Yönetim Sistemleri - Ödev 7

## 📌 Öğrenci Bilgileri

| Bilgi | Değer |
|-------|-------|
| **Ad Soyad** | Ali Fatih Arslan |
| **Öğrenci No** | 24020091018 |
| **Ders** | Veri Tabanı Yönetim Sistemleri |
| **Ödev No** | 7 |

---

## 🚀 Proje: Günün Mesajı - React Native & Firebase

Bu proje, **React Native (Expo)** ve **Firebase Firestore** kullanılarak geliştirilmiş, gerçek zamanlı (real-time) veri senkronizasyonu sunan çapraz platform bir mobil uygulamadır.

## 🌟 Özellikler

- **Gerçek Zamanlı Veritabanı:** Firestore `onSnapshot` dinleyicisi ile anlık veri akışı. Başka cihazdan eklenen veri anında ekrana düşer.
- **Tam CRUD Desteği:** Aynı ekran üzerinden pürüzsüz not ekleme, okuma, güncelleme ve silme işlemleri.
- **Modern Arayüz:** Tamamen yeniden tasarlanmış, gradient ve neon aksanlı premium UI.
- **Çapraz Platform:** iOS ve Android üzerinde tamamen yerel (native) performans.

## 🛠️ Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React Native & Expo** | Mobil uygulama framework'ü |
| **Firebase Firestore** | NoSQL gerçek zamanlı veritabanı |
| **Expo Router** | Dosya tabanlı yönlendirme |
| **react-native-safe-area-context** | Güvenli alan yönetimi |

## 📦 Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
cd Ali_Fatih_Arslan_24020091018
npm install

# Uygulamayı başlat
npx expo start

# Android emülatörde çalıştır
npx expo start --android
```

## 📁 Proje Yapısı

```
Ali_Fatih_Arslan_24020091018/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          # Ana layout (tema sağlayıcı)
│   │   ├── index.tsx            # Ana ekran (CRUD işlemleri)
│   │   └── explore.tsx          # Keşfet ekranı
│   ├── components/              # Yeniden kullanılabilir bileşenler
│   ├── constants/
│   │   └── theme.ts             # Renk paleti ve tema sabitleri
│   ├── hooks/                   # Özel React hook'ları
│   └── firebaseConfig.js        # Firebase yapılandırması
├── assets/                      # Görseller ve ikonlar
├── app.json                     # Expo yapılandırması
├── package.json                 # Proje bağımlılıkları
└── tsconfig.json                # TypeScript yapılandırması
```

---
**Ali Fatih Arslan** | 24020091018 | Veri Tabanı Yönetim Sistemleri
