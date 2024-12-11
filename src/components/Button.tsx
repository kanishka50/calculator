import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import {Styles} from "../styles/GlobalStyles"
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface ButtonProps {
    onPress: () => void;
    title: string;
    isBlue?: boolean;
    isGray?: boolean;
    icon?: string;
}

export default function Button({ title, onPress, isBlue, isGray, icon }: ButtonProps) {
    return (
      <TouchableOpacity
        style={isBlue ? Styles.btnBlue : Styles.btnGray} // Choose between blue and gray
        onPress={onPress}
      >
        {icon ? (
        <FontAwesome5 name={icon} size={24} color='white'/>
      ) : (
        <Text style={{fontSize: 32, color:'white'}}>{title}</Text>
      )}
      </TouchableOpacity>
    );
  }