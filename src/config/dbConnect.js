import mongoose from 'mongoose';

async function connectToDB(){
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.1zlgdy9.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0");
    
    return mongoose.connection
}

export default connectToDB;
