const express = require('express');
const app = express();
const router = require('endpoint-router-path'); // Import main router

app.use(express.json());


app.use('/api', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
