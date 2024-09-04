const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' );

const layoutSchema = new mongoose.Schema({
  components: Array,
});

const Layout = mongoose.model('Layout', layoutSchema);

// Save layout
app.post('/api/save-layout', async (req, res) => {
  const { components } = req.body;
  try {
    const layout = new Layout({ components });
    await layout.save();
    res.status(201).send(layout);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Load layout
app.get('/api/load-layout', async (req, res) => {
  try {
    const layout = await Layout.findOne().sort({ _id: -1 }); // Get the most recent layout
    res.status(200).send(layout);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
