const axios = require('axios');

async function getFileAndProcess(fileUrl, processFunction) {
    try {
        const response = await axios.get(fileUrl, {
            responseType: 'arraybuffer',
        });

        const fileBuffer = Buffer.from(response.data);
        const result = await processFunction(fileBuffer);
        return result;
    } catch (error) {
        console.error('Error fetching or processing file:', error.message);
        throw error;
    }
}

module.exports = getFileAndProcess;
