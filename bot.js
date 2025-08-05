const mineflayer = require('mineflayer');
const express = require('express');
const path = require('path');
const Movements = require('mineflayer-pathfinder').Movements;
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { GoalBlock, GoalXZ } = require('mineflayer-pathfinder').goals;

const config = require('./settings.json');

const loggers = require('./logging.js');
const logger = loggers.logger;
const app = express();

// Bot status data
let botStatus = {
  isOnline: false,
  startTime: Date.now(),
  logs: [],
  events: [],
  position: { x: 0, y: 0, z: 0 },
  playerCount: 0,
  health: 20,
  food: 20
};

// Serve static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API endpoint for bot status
app.get('/api/status', (req, res) => {
  res.json(botStatus);
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Dashboard server running on port 5000');
});

function createBot() {
   const bot = mineflayer.createBot({
      username: config['bot-account']['username'],


