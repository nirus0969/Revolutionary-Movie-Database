import mongoose from 'mongoose';

const uri =
  'mongodb://admin:admin123@it2810-61.idi.ntnu.no:27017/moviedb?authSource=admin';

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

export default connectToMongoDB;
