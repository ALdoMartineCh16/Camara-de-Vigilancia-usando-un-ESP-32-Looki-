import React, { useState, JSX } from 'react';
import { View, Text, StyleSheet, Button, Image, ActivityIndicator, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function IndexScreen(): JSX.Element {
  const ESP32_BASE = 'http://192.168.18.26:81';
  const [resolucion, setResolucion] = useState<'QVGA'|'VGA'>('QVGA');
  const [loading, setLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(Date.now());

  const params: Record<string,string> = {
    QVGA: '?resolution=QVGA',
    VGA:  '?resolution=VGA',
  };
  const streamUri = `${ESP32_BASE}/stream`;

  const recargar = (): void => {
    setReloadKey(Date.now());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ESP32‑CAM Vigilancia</Text>

      <View style={styles.selector}>
        <Text style={styles.label}>Resolución:</Text>
        <Picker
          selectedValue={resolucion}
          style={styles.picker}
          onValueChange={(val) => setResolucion(val)}
        >
          <Picker.Item label="QVGA (320×240)" value="QVGA" />
          <Picker.Item label="VGA  (640×480)" value="VGA" />
        </Picker>
        <Button title="Recargar stream" onPress={recargar} />
      </View>

      {Platform.OS === 'web' ? (
        <Text style={styles.webNotice}>
          El video en tiempo real no corre en web. Usa Expo Go en tu celular.
        </Text>
      ) : loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.indicator} />
      ) : (
        <Image
          key={reloadKey}
          source={{ uri: streamUri }}
          style={styles.stream}
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#000', padding:16 },
  titulo:    { color:'#fff', fontSize:24, textAlign:'center', marginBottom:16 },
  selector:  { backgroundColor:'#222', padding:12, borderRadius:8, marginBottom:16 },
  label:     { color:'#ddd', marginBottom:4 },
  picker:    { color:'#fff', backgroundColor:'#333', borderRadius:4 },
  indicator: { marginTop:20 },
  stream:    { flex:1, borderRadius:8, borderWidth:1, borderColor:'#555' },
  webNotice: { color:'#fff', textAlign:'center', marginTop:20 },
});