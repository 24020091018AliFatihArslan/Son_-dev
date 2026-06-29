import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert, Animated } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Firestore'daki 'messages' koleksiyonunu tarihe göre sıralı şekilde dinle
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push({ id: doc.id, ...doc.data() });
      });
      setNotes(messagesArray);
    }, (error) => {
      console.error("Veri çekme hatası: ", error);
    });

    // Bileşen ekrandan kalktığında dinleyiciyi temizle
    return () => unsubscribe();
  }, []);

  // Yeni Veri Ekleme ve Güncelleme
  const handleSave = async () => {
    if (inputText.trim() === '') return;

    try {
      if (editingId) {
        // Güncelleme işlemi
        const noteRef = doc(db, "messages", editingId);
        await updateDoc(noteRef, { 
          message: inputText 
        });
        setEditingId(null);
      } else {
        // Yeni kayıt ekleme işlemi
        await addDoc(collection(db, "messages"), {
          message: inputText,
          createdAt: serverTimestamp() // Firestore sunucu zamanını baz alır
        });
      }
      setInputText('');
    } catch (error) {
      Alert.alert("Hata", "İşlem sırasında bir hata oluştu: " + error.message);
    }
  };

  // Veri Silme
  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      Alert.alert("Hata", "Silme işlemi başarısız: " + error.message);
    }
  };

  // Düzenleme moduna geçiş
  const editNote = (item) => {
    setInputText(item.message);
    setEditingId(item.id);
  };

  // Düzenleme modunu iptal et
  const cancelEdit = () => {
    setInputText('');
    setEditingId(null);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, index === 0 && styles.cardFirst]}>
      <View style={styles.cardAccent} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>💬</Text>
          </View>
          <Text style={styles.cardIndex}>#{index + 1}</Text>
        </View>
        <Text style={styles.messageText}>{item.message}</Text>
        <View style={styles.cardDivider} />
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => editNote(item)} style={styles.editButton} activeOpacity={0.7}>
            <Text style={styles.editButtonText}>✏️ Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton} activeOpacity={0.7}>
            <Text style={styles.deleteButtonText}>🗑️ Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Üst Başlık Alanı */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerEmoji}>🔥</Text>
          <Text style={styles.headerTitle}>Günün Mesajları</Text>
          <Text style={styles.headerSubtitle}>Ali Fatih Arslan • Firebase Firestore</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{notes.length} mesaj</Text>
          </View>
        </View>

        {/* Giriş Alanı */}
        <View style={[styles.inputContainer, editingId && styles.inputContainerEditing]}>
          {editingId && (
            <View style={styles.editingBanner}>
              <Text style={styles.editingBannerText}>✏️ Düzenleme modu</Text>
              <TouchableOpacity onPress={cancelEdit}>
                <Text style={styles.cancelText}>İptal</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Yeni bir mesaj yazın..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.saveButton, editingId && styles.updateButton]} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>
              {editingId ? '🔄 Güncelle' : '➕ Ekle'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mesaj Listesi */}
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📝</Text>
            <Text style={styles.emptyTitle}>Henüz mesaj yok</Text>
            <Text style={styles.emptySubtitle}>İlk mesajınızı ekleyerek başlayın!</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1E',
  },
  keyboardView: {
    flex: 1,
  },

  // ─── HEADER ─────────────────────────────────
  headerContainer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.15)',
  },
  headerEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E8EAFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(167, 139, 250, 0.8)',
    marginTop: 6,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  headerBadge: {
    marginTop: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  headerBadgeText: {
    color: '#A78BFA',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─── INPUT ──────────────────────────────────
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: '#141832',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainerEditing: {
    borderColor: 'rgba(251, 191, 36, 0.5)',
    shadowColor: '#FBBF24',
  },
  editingBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  editingBannerText: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '600',
  },
  cancelText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    color: '#E8EAFF',
    fontSize: 15,
    minHeight: 56,
    textAlignVertical: 'top',
    marginBottom: 12,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  updateButton: {
    backgroundColor: '#F59E0B',
    shadowColor: '#F59E0B',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─── LIST ───────────────────────────────────
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 4,
  },

  // ─── CARD ───────────────────────────────────
  card: {
    flexDirection: 'row',
    backgroundColor: '#141832',
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.12)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFirst: {
    borderColor: 'rgba(99, 102, 241, 0.3)',
    shadowColor: '#6366F1',
    shadowOpacity: 0.15,
  },
  cardAccent: {
    width: 5,
    backgroundColor: '#6366F1',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBadgeText: {
    fontSize: 14,
  },
  cardIndex: {
    color: 'rgba(167, 139, 250, 0.5)',
    fontSize: 12,
    fontWeight: '700',
  },
  messageText: {
    color: '#D4D4FF',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  editButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  editButtonText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  deleteButtonText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '600',
  },

  // ─── EMPTY STATE ────────────────────────────
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#E8EAFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: 'rgba(167, 139, 250, 0.6)',
    fontSize: 14,
  },
});