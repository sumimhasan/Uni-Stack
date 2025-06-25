const { Sequelize, DataTypes } = require('sequelize');

const dbUrl = 'mysql://user:password@localhost:3306/yourdb'; // Replace with your actual credentials
const sequelize = new Sequelize(dbUrl);

// Connect to database
async function connectToDatabaseSQL() {
    try {
        await sequelize.authenticate();
        console.log('Connected to SQL database');
    } catch (error) {
        console.error('Error connecting to SQL database:', error);
        throw error;
    }
}

// Cache for models
const models = {};

// Get or create model
function getModelSQL(tableName, schemaDefinition) {
    if (!models[tableName]) {
        models[tableName] = sequelize.define(tableName, schemaDefinition, {
            tableName,
            timestamps: false,
        });
    }
    return models[tableName];
}

// CRUD Functions

async function createDocumentSQL(tableName, schemaDefinition, data) {
    const Model = getModelSQL(tableName, schemaDefinition);
    await Model.sync();
    return await Model.create(data);
}

async function findDocumentsSQL(tableName, schemaDefinition, query = {}) {
    const Model = getModelSQL(tableName, schemaDefinition);
    await Model.sync();
    return await Model.findAll({ where: query });
}

async function findDocumentOneSQL(tableName, schemaDefinition, query = {}) {
    const Model = getModelSQL(tableName, schemaDefinition);
    await Model.sync();
    return await Model.findOne({ where: query });
}

async function updateDocumentSQL(tableName, schemaDefinition, filter, update) {
    const Model = getModelSQL(tableName, schemaDefinition);
    await Model.sync();
    return await Model.update(update, { where: filter });
}

async function deleteDocumentSQL(tableName, schemaDefinition, filter) {
    const Model = getModelSQL(tableName, schemaDefinition);
    await Model.sync();
    return await Model.destroy({ where: filter });
}

// Initialize connection
connectToDatabaseSQL();

module.exports = {
    createDocumentSQL,
    findDocumentsSQL,
    findDocumentOneSQL,
    updateDocumentSQL,
    deleteDocumentSQL,
    connectToDatabaseSQL,
};
