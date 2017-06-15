import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 1000, // maximum capacity, default 1000
  storageBackend: AsyncStorage,
  defaultExpires: null, // expire time, in milliseconds
  enableCache: true
});

function saveShoppingList(shoppingList) {
  const data = shoppingList.map( (item) => item.serialize() );

  storage.save({
    key: 'shoppingList',
    data
  });
}

function savePantryList(pantryList) {
  const data = pantryList.map( (item) => item.serialize() );

  storage.save({
    key: 'pantryList',
    data
  });
}

export { storage, saveShoppingList, savePantryList };
