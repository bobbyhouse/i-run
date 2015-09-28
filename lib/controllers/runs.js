//
// Controllers: runs.js
//
module.exports = (function() {

    var redis = require('redis'),
        client = redis.createClient();

    return {
        latest: function(callback) {

            client.ttl('run', function(err, ttl) {

                var value;

                if(ttl < 0) {

                    // Get updated value from the server
                    value = {name: "The first run."};

                    // Update cache                    
                    client.set('run', JSON.stringify(value), function() {
                        client.expire('run', 30);
                    });

                    callback.call(this, value);

                    return this;
                }

                // Return cached version of value 
                client.get('run', function(err, value) {
                    callback.call(this, JSON.parse(value));

                });

                return this;
            });
        },
    };
});