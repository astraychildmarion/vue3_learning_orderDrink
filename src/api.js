import db from './firebaseDb';

async function getAllDrinks() {
  const data = db.collection('drink')
    .get()
    .then((querySnapshot) => {
      const result = querySnapshot.docs.map((item) => ({ id: item.id, data: item.data() }));
      return result;
    });
  return data;
}
async function getOneDrink(id) {
  const result = await db
    .collection('drink')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return { id: doc.id, data: doc.data() };
      }
      console.log('no this data');
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}
function deleteDrink(id) {
  db.collection('drink')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document deleted!');
    })
    .catch((error) => {
      console.error(error);
    });
}
function updateDrink({ id, data }) {
  db.collection('drink')
    .doc(id)
    .update(data)
    .then(() => {
      console.log('User successfully updated!');
    })
    .catch((error) => {
      console.log(error);
    });
}

function addDrink(data) {
  db.collection('drink')
    .add(data)
    .then((doc) => {
      console.log('success', doc.id);
    })
    .catch((error) => {
      console.log('error:', error);
    });
}

export {
  getAllDrinks, getOneDrink, deleteDrink, updateDrink, addDrink,
};
