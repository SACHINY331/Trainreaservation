const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors')

// Connect to MongoDB

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/trainsearch', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log(err);
});

//  train schema and model
const trainSchema = new mongoose.Schema({
  name: String,
  route: [String],
  schedule: [String],
  distance: Number
});

const Train = mongoose.model('Train', trainSchema);

// API endpoint to retrieve all trains
app.post('/train', (req, res) => {

  console.log(req.body);
  const trains = new Train(req.body);
  trains.save().then(() => {
    res.status(201).send(trains);
  }).catch((e) => {
    res.send(e);
  });
});


app.get('/trains', (req, res) => {
  Train.find()
    .then(trains => {
      res.json(trains);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// API search  trains based on source and destination stations
app.get('/search', (req, res) => {
  const source = req.query.source;
  const destination = req.query.destination;

  Train.find({route: [source, destination]})
    .then(trains => {
      res.json(trains);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
});



// API  sort trains by price
app.get('/sort', (req, res) => {
  Train.find()
    .then(trains => {
      const sortedTrains = trains.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
      res.json(sortedTrains);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
