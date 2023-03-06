'use strict'

/* global describe it */
var request = require('supertest')

/*obtenemos nuestra api rest que vamos a testear*/
const { format_datetime } = require('../app/lib/utils.js');
var app = require('../app/server.js')

// describe('Actualizar una actividad', function () {
//     it('Actualiza la actividad retornando 200', function (done) {
//         request(app)
//             .put('/api/activities/1')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .send({
//                 'description': 'Cambio',
//                 'activity_id': 1
//             })
//             .expect(200, done)
//     })
// });

// describe('Eliminar una actividad', function () {
//     it('Elimina la actividad retornando 200', function (done) {
//         request(app)
//             .delete('/api/activities/6')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done)
//     })
// });

describe('Crear una nueva actividad', function () {
    it('Crea la actividad retornando 201', function (done) {
        request(app)
            .post('/api/activities/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                'description': 'Actividad #100',
                'date_time': format_datetime(new Date()),
                'category': 'Test',
                'priority': 1,
                'student_id': 'a00835351'
            })
            .expect(201, done)
    })
});

describe('Obtener lista de actividades', function () {
    it('Obtiene una lista de más de 1 elemento retornando 200', function (done) {
        request(app)
            .get('/api/activities/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})