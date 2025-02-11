export type ParamValue = {
    param: string;
    value: string;
};

export interface BusinessInfo {
    inn: ParamValue;
    registrationDate: ParamValue;
    registratorOrgan: ParamValue;
    registrationNumber: ParamValue;
    companyName: ParamValue;
    activityType: ParamValue;
    sooGuType: ParamValue;
    status: ParamValue;
    isBelongSmallBusiness: ParamValue;
    soaToCode: ParamValue;
    authorizedCapital: ParamValue;
    founders: {
        param: string;
        value: Array<{ name: string; share: string }>;
    };
    contacts: {
        email: ParamValue;
        phone: ParamValue;
        address: ParamValue;
    };
    director: ParamValue;
    dataDate: ParamValue;
}