const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let signatureCount = 0; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/signatures', (req, res) => {
    res.json({ count: signatureCount });
});

app.post('/api/sign', (req, res) => {
    signatureCount += 1;
    res.json({ success: true, count: signatureCount });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
