import { Injectable } from '@nestjs/common';
import { Logger } from 'src/Common/logger/Logger';

type AddressComponent = {
    long_name: string,
    short_name: string,
    types: string[]
}

@Injectable()
class GeocodeService {
    constructor(
        private logger: Logger
    ) {

    }

    async getLocation(lat, long) {
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`;
        
        return fetch(geocodingUrl)
            .then(result => {
                const json = result.json();
                this.logger.log(`[Response, geocode] GET ${geocodingUrl.substring(0, geocodingUrl.indexOf("key"))} ${result.status} ${result.statusText}, headers: ${JSON.stringify(result.headers)}, body: ${JSON.stringify(json)}]`)
                return json;
            })
            .then(result => {
                result = result.results[0];
                const addressComponent: AddressComponent[] = result.address_components;

                const postalCode = addressComponent.filter(r => r.types.includes("postal_code"))[0]?.long_name; 
                const country = addressComponent.filter(r => r.types.includes("country"))[0]?.long_name;
                const province = addressComponent.filter(r => r.types.includes("administrative_area_level_1"))[0]?.long_name;
                const kota = addressComponent.filter(r => r.types.includes("administrative_area_level_2"))[0]?.long_name;
                const kecamatan = addressComponent.filter(r => r.types.includes("administrative_area_level_3"))[0]?.long_name;
                const kelurahan = addressComponent.filter(r => r.types.includes("administrative_area_level_4"))[0]?.long_name;
                
                return {
                    postalCode,
                    country,
                    province,
                    kota,
                    kecamatan,
                    kelurahan
                }
            });       
    }
}

export default GeocodeService;