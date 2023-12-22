import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    const timestamp = new Date().getTime();
    await store.put({ content, timestamp });

    await tx.done;
    console.log('Data added to the database successfully');
  } catch (error) {
    console.error('Error adding data to the database:', error);
    throw error; // added rn
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');

    const result = await store.getAll();

    await tx.done;
    console.log('Data retrieved from the database:', result);

    return result;
  } catch (error) {
    console.error('Error retrieving data from the database:', error);
    throw error; // added rb
  }
};

initdb();