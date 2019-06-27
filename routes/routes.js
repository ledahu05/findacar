const DriversController = require('../controllers/drivers_controller');
module.exports = (app) => {
    app.get('/api', DriversController.greeting);
};

// app.get('/api', (req, res) => {

// });

// app.get('/api', (req, res) => {

// });

// app.get('/api', (req, res) => {

// });