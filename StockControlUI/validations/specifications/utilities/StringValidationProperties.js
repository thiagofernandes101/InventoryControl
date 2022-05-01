export function IsBlankOrEmpty(propertyValue) {
    return IsBank(propertyValue) || IsEmpty(propertyValue);
}

function IsBank(propertyValue) {
    return (!propertyValue || /^\s*$/.test(propertyValue));
}

function IsEmpty(propertyValue) {
    return (!propertyValue || propertyValue.length === 0 );
}