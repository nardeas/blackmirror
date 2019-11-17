import { AsyncStorage } from 'react-native';
import { StartData } from './types';

export async function persistUser(data: StartData) {
  try {
    const dataStr = JSON.stringify(data);
    await AsyncStorage.setItem('user', dataStr);
  } catch (error) {
    console.log('> Failed to persist user', error);
  }
}

export async function getPersistUser() {
  try {
    const userStr = await AsyncStorage.getItem('user');
    return JSON.parse(userStr) as StartData;
  } catch (error) {
    console.log('> Failed to get persisted user', error);
    return null;
  }
}

export async function clearUser() {
  await AsyncStorage.removeItem('user');
}