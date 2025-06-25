const mongoose = require('mongoose');

const url = 'dburlhere'; // Replace with your MongoDB connection string
const dbName = 'yourdb'; // Replace with your database name

async function connectToDatabase() {
    try {
        await mongoose.connect(`${url}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Helper function to get the model (it ensures no model is overwritten)
function getModel(collectionName, schemaDefinition) {
    // Check if the model already exists to avoid overwriting it
    return mongoose.models[collectionName] || mongoose.model(collectionName, new mongoose.Schema(schemaDefinition));
}

async function createDocument(collectionName, schemaDefinition, data) {
    const Model = getModel(collectionName, schemaDefinition);
    const document = new Model(data);
    return await document.save();
}

async function findDocuments(collectionName, schemaDefinition, query = {}) {
    const Model = getModel(collectionName, schemaDefinition);
    return await Model.find(query);
}

async function findDocumentOne(collectionName, schemaDefinition, query = {}) {
    const Model = getModel(collectionName, schemaDefinition);
    return await Model.findOne(query); // findOne will return the first matching document or null
}
 
async function updateDocument(collectionName, schemaDefinition, filter, update) {
    const Model = getModel(collectionName, schemaDefinition);
    return await Model.updateOne(filter, update);
}

async function deleteDocument(collectionName, schemaDefinition, filter) {
    const Model = getModel(collectionName, schemaDefinition);
    return await Model.deleteOne(filter);
}

connectToDatabase();

module.exports = {
    createDocument,
    findDocuments,
    updateDocument,
    deleteDocument,
    findDocumentOne,
    connectToDatabase,
};
