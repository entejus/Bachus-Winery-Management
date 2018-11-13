export const usersValidationKeys = {
    firstName: new RegExp("^\\p{L}{2,30}$","u"),
    lastName: new RegExp("^\\p{L}{2,30}$","u"),
    login: /^\w{4,10}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/,
    PESEL: /^\d{11}$/,
    eMail:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    phoneNumber: /^\d{11}$/,
    photo: /^.+$/,
    userRole: /^.+$/,
    imagePreviewUrl: /^.+$/
};

export const addressValidationKeys = {
    street: new RegExp("^\\p{L}{2,45}$","u"),
    buildingNumber: /^\d{1,4}$/,
    apartmentNumber: /^(|\d{1,2})$/,
    postalCode: /^(|\d{1,10})$/,
    city: new RegExp("^\\p{L}{2,20}$","u"),
    country: new RegExp("^\\p{L}{2,60}$","u")
};

export const categoriesDictValidationKeys = {
    name: new RegExp("^\\p{L}{3,20}$","u"),
    unit: new RegExp("^\\p{L}{2,20}$","u"),
    desc: new RegExp("^(|[\\s\\S]{2,250})$","u")
};