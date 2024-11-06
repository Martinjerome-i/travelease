export interface serviceChoicesCommonInterface {
// [x: string]: any;
    id: number,
    serviceChoices: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface customerCommonInterface {
    id: number,
    name: string,
    customerId: string,
    gstNo: string,
    phoneNumber: string,
    mail: string,
    address: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface supplierCommonInterface {
    id: number,
    nameOfSupplier: string,
    gstNo: string,
    contact: string,
    email: string,
    address: string,
    supplierModeOfService: number,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface orderCommonInterface {
    id: number,
    orderEntryDate: string,
    orderId: string,
    destination: string,
    route: string,
    dateOfTravel: string,
    pricePerPax: number,
    noOfPax: number,
    totalOrderValue: number,
    customerOrderName: number,
    orderPaymentMode: number,
    supplierModeOfService: number,
    orderVisaService: number,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface visaChoicesCommonInterface {
    id: number,
    visaChoices: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface paymentModeChoicesCommonInterface {
    id: number,
    orderChoices: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface paymentCollectionCommonInterface {
    id: number,
    customerPaymentId: number,
    orderPaymentId: number,
    customerEstimatedFirstPayment: string,
    customerEstimatedFirstPaymentDate: string,
    customerEstimatedSecondPayment: string,
    customerEstimatedSecondPaymentDate: string,
    customerEstimatedThirdPayment: string,
    customerEstimatedThirdPaymentDate: string,
    customerActualFirstPayment: string,
    customerActualFirstPaymentDate: string,
    customerActualFirstPaymentMode: number,
    customerActualSecondPayment: string,
    customerActualSecondPaymentDate: string,
    customerActualSecondPaymentMode: number,
    customerActualThirdPayment: string,
    customerActualThirdPaymentDate: string,
    customerActualThirdPaymentMode: number,
    customerAmountToBePaid: string,
    customerAmountPaid: string,
    customerPendingAmount: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface SupplierPaymentCommonInterface {
    id: number,
    paymentSupplier: number,
    paymentOrderId: number,
    bookingReferenceNumber: string,
    supplierEstimatedFirstPayment: string,
    supplierEstimatedFirstPaymentDate: string,
    supplierEstimatedSecondPayment: string,
    supplierEstimatedSecondPaymentDate: string,
    supplierEstimatedThirdPayment: string,
    supplierEstimatedThirdPaymentDate: string,
    supplierActualFirstPayment: string,
    supplierActualFirstPaymentDate: string,
    supplierActualFirstPaymentMode: number,
    supplierActualSecondPayment: string,
    supplierActualSecondPaymentDate: string,
    supplierActualSecondPaymentMode: number,
    supplierActualThirdPayment: string,
    supplierActualThirdPaymentDate: string,
    supplierActualThirdPaymentMode: number,
    supplierAmountToBePaid: string,
    supplierAmountPaid: string,
    supplierPendingAmount: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}
