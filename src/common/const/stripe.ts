export enum STRIPE_CONNECT_STATUS {
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
}

export const capabilitiesConfig = {
    affirm_payments: {
        currency: ['USD'],
    },
    afterpay_clearpay_payments: {
        currency: ['USD', 'CAD', 'GBP', 'AUD', 'NZD', 'EUR'],
    },
    klarna_payments: {
        currency: ['EUR', 'USD', 'GBP', 'DKK', 'SEK', 'NOK'],
    },
}

export const BNPL = {
    affirm_payments: (country) => {
        return {
            US: [
                {
                    country: 'United States',
                    countryCode: 'US',
                    currency: ['USD'],
                },
            ],
            CA: [
                {
                    country: 'Canada',
                    countryCode: 'CA',
                    currency: ['CAD'],
                },
            ],
        }[country]
    },
    afterpay_clearpay_payments: (country) => {
        return {
            US: [
                {
                    country: 'United States',
                    countryCode: 'US',
                    currency: ['USD'],
                },
            ],
            CA: [
                {
                    country: 'Canada',
                    countryCode: 'CA',
                    currency: ['CAD'],
                },
            ],
            GB: [
                {
                    country: 'United Kingdom',
                    countryCode: 'GB',
                    currency: ['GBP'],
                },
            ],
            NZ: [
                {
                    country: 'New Zealand',
                    countryCode: 'NZ',
                    currency: ['NZD'],
                },
            ],
            AU: [
                {
                    country: 'Australia',
                    countryCode: 'AU',
                    currency: ['AUD'],
                },
            ],
            FR: [
                {
                    country: 'France',
                    countryCode: 'FE',
                    currency: ['EUR'],
                },
            ],
            ES: [
                {
                    country: 'Spain',
                    countryCode: 'ES',
                    currency: ['EUR'],
                },
            ],
        }[country]
    },
    klarna_payments: (country) => {
        const euSupport = [
            {
                country: 'Austria',
                countryCode: 'AT',
                currency: ['EUR'],
            },
            {
                country: 'Belgium',
                countryCode: 'BE',
                currency: ['EUR'],
            },
            {
                country: 'Denmark',
                countryCode: 'DK',
                currency: ['DKK'],
            },
            {
                country: 'Czechia',
                countryCode: 'CZ',
                currency: ['CZK'],
            },
            {
                country: 'Finland',
                countryCode: 'FI',
                currency: ['EUR'],
            },
            {
                country: 'France',
                countryCode: 'FE',
                currency: ['EUR'],
            },
            {
                country: 'Germany',
                countryCode: 'DE',
                currency: ['EUR'],
            },
            {
                country: 'Greece',
                countryCode: 'GR',
                currency: ['EUR'],
            },
            {
                country: 'Ireland',
                countryCode: 'IE',
                currency: ['EUR'],
            },
            {
                country: 'Italy',
                countryCode: 'IT',
                currency: ['EUR'],
            },
            {
                country: 'Netherlands',
                countryCode: 'NL',
                currency: ['EUR'],
            },
            {
                country: 'Norway',
                countryCode: 'NO',
                currency: ['NOK'],
            },
            {
                country: 'Poland',
                countryCode: 'PL',
                currency: ['PLN'],
            },
            {
                country: 'Portugal',
                countryCode: 'PT',
                currency: ['EUR'],
            },
            {
                country: 'Spain',
                countryCode: 'ES',
                currency: ['EUR'],
            },
            {
                country: 'Sweden',
                countryCode: 'SE',
                currency: ['SEK'],
            },
            {
                country: 'Switzerland',
                countryCode: 'CH',
                currency: ['CHF'],
            },
            {
                country: 'United Kingdom',
                countryCode: 'GB',
                currency: ['GBP'],
            },
        ]
        switch (country) {
            //Austria
            case 'AT':
            //Belgium
            case 'BE':
            //Czechia
            case 'CZ':
            //Denmark
            case 'DK':
            //Finland
            case 'FI':
            //France
            case 'FR':
            //Germany
            case 'DE':
            //Estonia
            case 'EE':
            //Greece
            case 'GR':
            //Ireland
            case 'IE':
            //Italia
            case 'IT':
            //Latvia
            case 'LV':
            // Lithuania
            case 'LT':
            //Netherlands
            case 'NL':
            //Norway
            case 'NO':
            //Poland
            case 'PL':
            //Portugal
            case 'PT':
            //Slovakia
            case 'SK':
            //Slovenia
            case 'SI':
            //Spain
            case 'ES':
            //Sweden
            case 'SE':
            //Switzerland
            case 'CH':
            //UK
            case 'GB':
                return euSupport
            //Australia
            case 'AU':
                return [
                    {
                        country: 'Australia',
                        countryCode: 'AU',
                        currency: ['AUD'],
                    },
                ]
            //Canada
            case 'CA':
                return [
                    {
                        country: 'Canada',
                        countryCode: 'CA',
                        currency: ['CAD'],
                    },
                ]
            //New Zealand
            case 'NZ':
                return [
                    {
                        country: 'New Zealand',
                        countryCode: 'NZ',
                        currency: ['NZD'],
                    },
                ]
            case 'US':
                return [
                    {
                        country: 'United States',
                        countryCode: 'US',
                        currency: ['USD'],
                    },
                ]
        }
    },
}
