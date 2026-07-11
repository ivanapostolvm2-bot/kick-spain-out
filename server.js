const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Започваме от вашите 4 реални гласа
let signatureCount = 4; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Връща броя на гласовете
app.get('/api/signatures', (req, res) => {
    res.json({ count: signatureCount });
});

// Добавяне на глас при натискане на Vote
app.post('/api/sign', (req, res) => {
    signatureCount += 1;
    res.json({ success: true, count: signatureCount });
});

// Премахване на глас (Приема абсолютно ВСЯКАКВО име без проверка)
app.post('/api/remove', (req, res) => {
    const { name, reason } = req.body;
    
    // Проверява само дали полетата не са празни
    if (!name || !reason) {
        return res.json({ success: false, message: "Please fill all fields!" });
    }

    // Намалява брояча с 1 (само ако има останали гласове, за да не падне под нулата)
    if (signatureCount > 0) {
        signatureCount -= 1;
    }

    res.json({ success: true, count: signatureCount });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
