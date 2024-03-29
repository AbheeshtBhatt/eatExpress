const mongoose=require('mongoose')
require('dotenv').config()
const mongoURI=process.env.mongoURI

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const food_items_data = await fetched_data.find({}).toArray();
    
        const foodCategory = await mongoose.connection.db.collection("food_category");
        const foodCategory_data = await foodCategory.find({}).toArray();
    
        global.food_items = food_items_data;
        global.foodCategory = foodCategory_data;
    
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    
}

module.exports = mongoDB