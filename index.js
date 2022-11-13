const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const {deleteOne} = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await
const carbonara = {
  title:'carbonara',
  level: 'Amateur',
  ingredients:['massa', 'bacon', 'queijo', 'natas'],
  cousine: 'italiano',
  dishType: 'main_course',
  image: 'https://veja.abril.com.br/wp-content/uploads/2021/04/CARBONARA-CYBERCOOK-1.jpeg.jpg',
  duration: 50,
  creator: 'Miguel Quiaios'
}

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    await Recipe.create('carbonara');
    console.log(carbonara.title)

    let totalRecipes = await Recipe.insertMany(data);


    for(let i = 0; i < totalRecipes; i++){
      console.log(totalRecipes[i].title)
    }


    let updateGenovese = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
    console.log(updateGenovese)
    console.log("duration change") 
 
     await Recipe.deleteOne({title: 'Carrot Cake'})
     
     dbConnection.disconnect();


} catch (error) {
    console.log(error);
  }
};
