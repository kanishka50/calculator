//Assignment 2
//Mobile Application Development
//IM/2021/047
//Kanishka Dilhan Premarathna

import React, { useState } from "react";
import Button from "./Button";
import { View, Text, Alert } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { evaluate } from "mathjs";

const MyKeyboard = () => {
  const [currentInput, setCurrentInput] = useState<string>(""); // Current expression
  const [history, setHistory] = useState<string>(""); // Calculation history


  const handleNumberPress = (buttonValue: string) => {
    setCurrentInput((prev) => prev + buttonValue); // Append the number
  };

  
  const handleOperationPress = (buttonValue: string) => {
    // Prevent consecutive operators
    if (/[\+\-\*\/]$/.test(currentInput)) {
      setCurrentInput((prev) => prev.slice(0, -1) + buttonValue); // Replace last operator
    } else {
      setCurrentInput((prev) => prev + buttonValue); // Append the operator
    }
  };



  const calculateResult = () => {
    try {
      // Validate input
      if (/[\+\-\*\/]$/.test(currentInput)) {
        Alert.alert("Invalid Expression", "Expression cannot end with an operator.");
        return;
      }
      if (/\/0(?!\d)/.test(currentInput)) {
        setCurrentInput("Can't divide by zero");
        setHistory(currentInput + " = Error");
        return;
      }
      const result = evaluate(currentInput); // Use mathjs to evaluate with BODMAS
      setHistory(currentInput + " = " + result); // Save to history
      setCurrentInput(result.toString()); // Display the result

    } catch (error) {
      Alert.alert("Error", "Invalid mathematical expression.");
      setCurrentInput(""); // Clear the input
    }
  };



  const clearAll = () => {
    setCurrentInput(""); // Clear current input
    setHistory(""); // Clear history
  };


  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1)); // Remove the last character
  };


const handleSpecialCharacters = (char: string): void => {
    if (char === "(") {
      // Allow '(' at the start, after operators, or after open parentheses or after number
      if (
        currentInput === "" || 
        /[\+\-\*\/\(]$/.test(currentInput) || // After operator or another '('
        // currentInput.endsWith("=") // To start a new calculation after a result
        /\d$/.test(currentInput) // After a number
      ) {
        setCurrentInput((prev) => prev + char);
      }
    } else if (char === ")") {
      // Allow ')' only if there are unmatched '('
      const openParens = (currentInput.match(/\(/g) || []).length;
      const closeParens = (currentInput.match(/\)/g) || []).length;
  
      if (openParens > closeParens) {
        setCurrentInput((prev) => prev + char);
      }
    } else if (char === ".") {
      // Prevent multiple decimal points in the current number
      const lastPart = currentInput.split(/[\+\-\*\/\(\)]/).pop();
      if (!lastPart?.includes(".")) {
        setCurrentInput((prev) => prev + char);
      }
    } else {
      // Default case: Append other characters normally
      setCurrentInput((prev) => prev + char);
    }
  };


 // Dynamic font size based on input length
 const getFontSize = (inputLength: number) => {
    if (inputLength > 12) return 30;   // Reduce font size significantly for inputs over 13 digits
    if (inputLength > 9) return 50;    // For 9-12 digits
    if (inputLength > 7) return 70;     // For 7-9 digits
    return 92;                        // Default font size for less than 7 digits
  };

  // Dynamic font size for history based on its length
  const getHistoryFontSize = (historyLength: number) => {
    if (historyLength > 12) return 20;  // Reduce font size significantly for history over 12 digits
    return 50;                         // Default font size for history
  };

  const fontSize = getFontSize(currentInput.length);
  const historyFontSize = getHistoryFontSize(history.length);
  


  return (
    <View style={Styles.viewBottom}>
      {/* Display calculation history */}
      <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
      <Text style={[Styles.screenSecondNumber, { color: myColors.gray, fontSize: historyFontSize }]}>
          {history}
        </Text>
        <Text style={[Styles.screenFirstNumber, { fontSize: fontSize }]}>
          {currentInput || "0"}
        </Text>
      </View>

      {/* Buttons for digits and operations */}
      <View style={Styles.row}>
        <Button title="C"  onPress={clearAll} />
        <Button title="("  onPress={() => handleSpecialCharacters("(")} />
        <Button title=")"  onPress={() => handleSpecialCharacters(")")} />
        <Button title="" icon="divide" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="*" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleSpecialCharacters(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="" icon="backspace" onPress={handleBackspace} />
        <Button title="=" isBlue onPress={calculateResult} />
      </View>
    </View>
  );
};

export default MyKeyboard;
