import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const CalorieTracker = () => {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [foodEntries, setFoodEntries] = useState([]);

  const handleFoodChange = (text) => {
    setFood(text);
  };

  const handleCaloriesChange = (text) => {
    setCalories(text);
  };

  const handleProteinChange = (text) => {
    setProtein(text);
  };

  const handleBodyWeightChange = (text) => {
    setBodyWeight(text);
  };

  const handleGoalWeightChange = (text) => {
    setGoalWeight(text);
  };

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleSexChange = (text) => {
    setSex(text);
  };

  const handleClearCalories = () => {
    setTotalCalories(0);
  };

  const handleClearProtein = () => {
    setTotalProtein(0);
  };

  const handleClearFoodEntries = () => {
    setFoodEntries([]);
  };

  const calculateSuggestedCalories = () => {
    if (bodyWeight && age && sex && goalWeight) {
      const currentBodyWeight = parseFloat(bodyWeight);
      const targetBodyWeight = parseFloat(goalWeight);
      let suggestedCalories = currentBodyWeight * 15; // Default value

      if (targetBodyWeight > currentBodyWeight) {
        suggestedCalories = targetBodyWeight * 15 - 500;
      }

      const ageInt = parseInt(age);
      if (sex === 'male') {
        if (ageInt >= 19 && ageInt <= 30) {
          suggestedCalories += 400;
        } else if (ageInt >= 31 && ageInt <= 60) {
          suggestedCalories += 200;
        }
      } else if (sex === 'female') {
        if (ageInt >= 31 && ageInt <= 60) {
          suggestedCalories -= 200;
        } else if (ageInt >= 61) {
          suggestedCalories -= 400;
        }
      }

      return Math.round(suggestedCalories);
    }
    return 0;
  };

  const handleAddCalories = () => {
    const enteredCalories = parseInt(calories, 10);
    const enteredProtein = parseInt(protein, 10);
    if (!isNaN(enteredCalories) && !isNaN(enteredProtein) && food.trim() !== '') {
      const newTotal = totalCalories + enteredCalories;
      const newTotalProtein = totalProtein + enteredProtein;
      setTotalCalories(newTotal);
      setTotalProtein(newTotalProtein);
      setFoodEntries((prevEntries) => [
        ...prevEntries,
        { food: food.trim(), calories: enteredCalories, protein: enteredProtein },
      ]);
      setFood('');
      setCalories('');
      setProtein('');
    }
  };

  const suggestedCalories = calculateSuggestedCalories();

  return (
    <View style={{ flex: 1, backgroundColor: '#add8e6', marginTop: 0, padding: 20 }}>
      <Text
        style={{
          fontFamily: 'Lucida Calligraphy', // Fancy cursive font
          fontSize: 40,
          color: 'white',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Calorie Tracker
      </Text>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Food Entries</Text>
        <FlatList
          data={foodEntries}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, color: '#333' }}>{`${item.food}: ${item.calories} calories, ${item.protein}g protein`}</Text>
          )}
        />
        <Button title="Clear Food Entries" onPress={handleClearFoodEntries} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Body Weight (lbs):</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={bodyWeight}
            onChangeText={handleBodyWeightChange}
            keyboardType="numeric"
          />
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Goal Weight (lbs):</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={goalWeight}
            onChangeText={handleGoalWeightChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Age:</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={age}
            onChangeText={handleAgeChange}
            keyboardType="numeric"
          />
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Sex:</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={sex}
            onChangeText={handleSexChange}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Food:</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={food}
            onChangeText={handleFoodChange}
          />
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Calories:</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={calories}
            onChangeText={handleCaloriesChange}
            keyboardType="numeric"
          />
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Protein (g):</Text>
          <TextInput
            style={{ height: 40, width: 150, borderColor: 'gray', borderWidth: 1 }}
            value={protein}
            onChangeText={handleProteinChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button title="Add Calories & Protein" onPress={handleAddCalories} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ color: '#333' }}>Total Calories: {totalCalories}</Text>
        <Button title="Clear Calories" onPress={handleClearCalories} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Total Protein: {totalProtein}g</Text>
        <View style={{ marginLeft: 20 }}>
          <Button title="Clear Protein" onPress={handleClearProtein} />
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>Suggested Calories: {suggestedCalories}</Text>
        </View>
      </View>
    </View>
  );
};

export default CalorieTracker;