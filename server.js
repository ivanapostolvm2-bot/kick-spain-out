const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Списък с гласувалите хора (започваме с 4 за тест)
let voters = [
    { name: "Ivan", reason: "Rigged tournament" },
    { name: "Alex", reason: "Bribed refs" },
    { name: "John", reason: "Unfair games" },
    { name: "Elena", reason: "Bad decisions" }
];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Връща броя на гласовете
app.get('/api/signatures', (req, res) => {
    res.json({ count: voters.length });
});

// Добавяне на глас (само с бутона Vote)
app.post('/api/sign', (req, res) => {
    voters.push({ name: "Anonymous", reason: "Direct Vote" });
    res.json({ success: true, count: voters.length });
});

// Премахване на глас по име и причина
app.post('/api/remove', (req, res) => {
    const { name, reason } = req.body;
    
    if (!name || !reason) {
        return res.json({ success: false, message: "Please fill all fields!" });
    }

    // Търси дали има такъв човек в списъка
    const index = voters.findIndex(v => v.name.toLowerCase() === name.toLowerCase());

    if (index !== -1) {
        voters.splice(index, 1); // Маха го от списъка
        res.json({ success: true, count: voters.length });
    } else {
        res.json({ success: false, message: "Name not found in the voting list!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
