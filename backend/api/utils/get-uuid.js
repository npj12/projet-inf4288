const sha1 = require('crypto-js/sha1');

let mapRegion = function(regionName){
    switch(regionName){
        case 'Adamaoua':
            return 'AD'
        case 'Center':
            return 'CE'
        case 'East':
            return 'EA'
        case 'Extreme nord':
            return 'EN'
        case 'Littoral':
            return 'LT'
        case 'Ngaoundere':
            return 'NG'
        case 'Nord':
            return 'NO'
        case 'Nord-West':
            return 'NW'
        case 'West':
            return 'WE'
        case 'South-West':
            return 'SW'
        default:
            return 'CE'
        
    }
}


let getUUID = function(regionName){
    const currentDate = new Date();
    return (currentDate.getUTCFullYear().toString().substring(2) +  mapRegion(regionName) + sha1(currentDate.toISOString()).toString().substring(0, 8)).toUpperCase();
}

module.exports = {
    getUUID
}