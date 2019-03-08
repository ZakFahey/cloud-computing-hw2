const Hapi = require('hapi');
const Weather = require('./weather');

const server = Hapi.server({
    host: 'localhost',
    port: 8000
});


server.route({
    method: 'GET',
    path: '/historical/',
    handler: function (request, h) {
        const dates = Weather.getAllDates();
        return h.response(dates);
    }
});

server.route({
    method: 'GET',
    path: '/historical/{date}',
    handler: function (request, h) {
        const record = Weather.getRecord(request.params.date);
        if (record === null) {
            return h.response().code(404);
        }
        return h.response(record);
    }
});

server.route({
    method: 'POST',
    path: '/historical/',
    handler: function (request, h) {
        Weather.addOrUpdateRecord(request.payload);
        const returnVal = { DATE: request.payload.DATE };
        return h.response(returnVal).code(201);
    }
});

server.route({
    method: 'DELETE',
    path: '/historical/{date}',
    handler: function (request, h) {
        const record = Weather.deleteRecord(request.params.date);
        if (record === null) {
            return h.response().code(404);
        }
        return h.response(record);
    }
});

server.route({
    method: 'GET',
    path: '/forecast/{date}',
    handler: function (request, h) {
        const record = Weather.getForecast(request.params.date);
        if (record === null) {
            return h.response("Date out of range").code(400);
        }
        return h.response(record);
    }
});


server.start();
console.log('Server running at port 8000');