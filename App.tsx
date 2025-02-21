import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [lugar, setLugar] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const enviarFormulario = async () => {
    const formulario = { nombre, fecha, lugar, cantidad, descripcion };
    try {
      const response = await fetch('https://tubackend.com/api/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Formulario enviado correctamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al enviar el formulario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre del solicitante" value={nombre} onChangeText={setNombre} />
      <TextInput placeholder="Fecha de despacho" value={fecha} onChangeText={setFecha} />
      <TextInput placeholder="Lugar de entrega" value={lugar} onChangeText={setLugar} />
      <TextInput placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} keyboardType="numeric" />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} multiline />
      <Button title="Enviar" onPress={enviarFormulario} />
    </View>
  );
};

export default App;