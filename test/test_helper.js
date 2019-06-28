const mongoose = require('mongoose');
 
// before starting the test suite, connect to the test database
before(done => {
  // connect to the test db
  mongoose.connect(
    "mongodb://127.0.0.1/mockubber_test",
    { useNewUrlParser: true },
    error => {
      if ( error ) {
        console.warn("connection error", error);
        done(error);
      }
      console.log( "===================\nConnected to test DB\n===================" );
      done();
    }
  );
});
 
// before running any tests, remove the drivers collection
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
  .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then( () => done() )
    .catch( () => done() );
})