import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

const eyeOnIcon = require('../assets/images/eye-on.png');
const eyeOffIcon = require('../assets/images/editIcon.png');

export default function Input({ placeholder = "", isPassword = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={setText}
          value={text}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={isPasswordVisible ? eyeOnIcon : eyeOffIcon}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    height: 60,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    // marginVertical: 5,
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});
