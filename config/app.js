const User = require('../routes/Users');

function initializeRoutes(app) {
    app.use('/', User)
}

module.exports = initializeRoutes;