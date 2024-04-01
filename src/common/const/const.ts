export const EVENTS = {
    BOOK: 'Book',
    CANCEL_BY_HOST: 'CancelByHost',
    CANCEL_BY_GUEST: 'CancelByGuest',
    PAYOUT: 'Payout',
    PROPERTY_CREATED: 'PropertyCreated',
    INSURANCE_COLLECTED_EVENTS: 'InsuranceCollectedEvent',
}
export const TOPICS = {
    SC_EVENTS: 'smartcontract.public.events',
}
export const GROUP_IDS = {
    SC_EVENTS: 'paygate-sc.events',
}
export const DB_OPERATIONS = {
    INSERT: 'c',
    UPDATE: 'u',
    DELETE: 'd',
    REPLICATE: 'r',
}
export const PAYOUT_TYPE = {
    FULL: 1,
    PARTIAL: 2,
    PENDING_INSURANCE_FEE: 3,
}
export const ENV = {
    LOCAL: 'local',
    DEV: 'dev',
    STAGING: 'staging',
    PROD: 'prod',
}
export const CUSTOM_DOMAIN = {
    SELF_HOSTED: 'self_hosted',
    CUSTOM: 'custom',
}
export const PAYPAL_EVENTS = {
    ORDER: {
        COMPLETED: 'CHECKOUT.ORDER.COMPLETED',
    },
}

