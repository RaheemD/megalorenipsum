const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001; // Use dynamic port assignment

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

let nextId = 200; // Start from the next available ID
let records = Array.from({ length: 200 }, (_, index) => ({
    id: index + 1,
    column1: `Data ${index + 1} A`,
    column2: `Data ${index + 1} B`,
    column3: `Data ${index + 1} C`,
    column4: `Data ${index + 1} D`,
    column5: `Data ${index + 1} E`
}));

app.get('/api/records', (req, res) => {
    res.json(records);
});

app.post('/api/records', (req, res) => {
    const record = req.body;
    record.id = nextId++;
    records.push(record);
    res.json(record);
});

app.put('/api/records/:id', (req, res) => {
    const { id } = req.params;
    let updatedRecord = req.body;
    updatedRecord.id = parseInt(id, 10);
    records = records.map(record => (record.id == id ? updatedRecord : record));
    res.json(updatedRecord);
});

app.delete('/api/records/:id', (req, res) => {
    const { id } = req.params;
    records = records.filter(record => record.id != id);
    res.json({ message: `Record ${id} deleted` });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});