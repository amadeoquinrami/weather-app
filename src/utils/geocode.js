const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?' + 'q=' + encodeURIComponent(address) + '&country=us' + '&limit=1' + '&access_token=pk.eyJ1IjoiYW1hZGVvcXVpbiIsImEiOiJjbWpnbHNpNTkxNWIyM2VvdGZnbWQybTZsIn0.2fLXiQmDYq-IsZPsrMITHQ'
    request ({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location serviices', undefined)
        } else if ( body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
} 

module.exports = geocode