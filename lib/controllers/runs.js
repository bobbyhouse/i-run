//
// Controllers: runs.js
//
module.exports = (function(env) {

    var redis = require('redis'),
        client = redis.createClient();

    var request = require('request');

    return {
        latest: function(callback) {

            client.ttl('run', function(err, ttl) {

                if(ttl < 0) {

                    // Get run summary from the API and cache result.

                    var uri = 'https://api.nike.com/v1/me/sport/activities?count=1&access_token=' + env.secrets.nike;

                    request(uri, function(err, resp, body) {

                        var summary = (JSON.parse(body)).data[0].metricSummary;

                        var expireSeconds = 86400;

                        client.set('run', JSON.stringify(summary), function() {
                            client.expire('run', expireSeconds);
                        })

                        callback.call(this, summary)
                    });

                    return this;
                }

                // Retrieve cached copy of run summary .
                client.get('run', function(err, runSummary) {
                    callback.call(this, JSON.parse(runSummary));
                });

                return this;
            });
        },
    };
});