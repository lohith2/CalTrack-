import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';
import * as Application from 'expo-application';
import { v4 as uuidv4 } from 'uuid'; 

const supabaseUrl = 'https://hkcxvbsjhcdgfjfrutcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrY3h2YnNqaGNkZ2ZqZnJ1dGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzODY2MTQsImV4cCI6MjAyODk2MjYxNH0.jjY6wmZdD3p2EyzueUDIxGgsb2227Rgzxi82uicBJtI';
const supabase = createClient(supabaseUrl, supabaseKey);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [sexState, setSex] = useState('');
  const [ageState, setAge] = useState('');
  const [bodyWeightState, setBodyWeight] = useState('');
  const [goalWeightState, setGoalWeight] = useState('');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    const fetchDeviceId = async () => {
      if (Platform.OS === 'ios') {
        const iosId = await Application.getIosIdForVendorAsync();
        setDeviceId(iosId);
      } else if (Platform.OS === 'android') {
        const androidId = await Application.androidId;
        setDeviceId(androidId);
      } else {
        const webDeviceId = localStorage.getItem('device_id') || uuidv4();
        localStorage.setItem('device_id', webDeviceId);
        setDeviceId(webDeviceId);
      }
    };

    fetchDeviceId();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (deviceId) {
        try {
          const { data, error } = await supabase
            .from('profiles1')
            .select('*')
            .eq('device_id', deviceId)
            .order('id', { ascending: false })
            .limit(1);
    
          if (error) {
            console.error('Error fetching profile data:', error.message);
          } else {
            console.log('Profile data fetched:', data);
            if (data && data.length > 0) {
              const profile = data[0];
              setSex(profile.sex);
              setAge(profile.age.toString());
              setBodyWeight(profile.body_weight.toString());
              setGoalWeight(profile.goal_weight.toString());
            } else {
              console.log('No profile found for this device ID');
            }
          }
        } catch (error) {
          console.error('Unexpected error fetching profile data:', error.message);
        }
      }
    };
  
    if (deviceId) {
      fetchProfileData();
    }
  }, [deviceId]);

  const handleSaveProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles1')
        .insert([
          {
            sex: sexState,
            age: parseInt(ageState, 10),
            body_weight: parseFloat(bodyWeightState),
            goal_weight: parseFloat(goalWeightState),
            device_id: deviceId,
          },
        ]);

      if (error) {
        console.error('Error saving profile data:', error.message);
      } else {
        console.log('Profile data saved successfully:', data);
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error('Unexpected error saving profile data:', error.message);
    }
  };

  const handleExitToMainMenu = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Profile</Text>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sex (male or female):</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={sexState}
          onChangeText={setSex}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Age:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={ageState}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Body Weight (lbs):</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={bodyWeightState}
          onChangeText={setBodyWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Weight (lbs):</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={goalWeightState}
          onChangeText={setGoalWeight}
          keyboardType="numeric"
        />
      </View>
      <Button title="Save" onPress={handleSaveProfile} />
      <View style={{ marginTop: 10 }}>
        <Button title="Exit to Main Menu" onPress={handleExitToMainMenu} color="#000000" />
      </View>
    </View>
  );
};

export default ProfileScreen;
