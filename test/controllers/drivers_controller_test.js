const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('CrDrivers controller', () => {
    it('POST to /api/drivers create a new driver', (done) => {
        Driver.count()
            .then(count => {
                request(app)
                    .post('/api/drivers')
                    .send({email: 'test@test.com'})
                    .end((err,response) => {
                        Driver.count().then(newCount => {
                            assert(count+1 === newCount);
                        });
                        done();
                    });
            })
    });

    it('PUT to /api/drivers edit an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com', driving: false});
        driver.save().then(() => {
            request(app)
            .put(`/api/drivers/${driver._id}`)
            .send({driving: true})
            .end(() => {
                Driver.findOne({email: 't@t.com'})
                    .then(driver => {
                        assert(driver.driving === true);
                        done();
                    });
                
            });
        })    
    });

    it('DELETE to /api/drivers delete an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com', driving: false});
        driver.save().then(() => {
            request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end(() => {
                Driver.find({email: 't@t.com'})
                    .then(drivers => {
                        // console.log(drivers);
                        assert(drivers.length === 0);
                        done();
                    });
                
            });
        })    
    });
});