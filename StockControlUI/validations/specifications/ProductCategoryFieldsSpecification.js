import * as stringvalidationProperties from './utilities/StringValidationProperties';
import * as numberValidationProperties from './utilities/NumberValidationProperties';

export function HasRequiredFieldsBeenFilled(productCategoryView) {
    let isCodePropertyBlankOrEmpty = stringvalidationProperties.IsBlankOrEmpty(productCategoryView.code);
    let isDescriptionBlankOrEmpty = stringvalidationProperties.IsBlankOrEmpty(productCategoryView.description);

    return !isCodePropertyBlankOrEmpty && !isDescriptionBlankOrEmpty;
}

export function IsCodePropertyAValidNumber(codePropertyValue) {
    let isCodePropertyANumber = numberValidationProperties.IsNumber(codePropertyValue);
    let isCodeValueGreaterThanZero = Number.parseInt(codePropertyValue) > 0;

    console.log(`isCodePropertyANumber: ${isCodePropertyANumber}`);
    console.log(`isCodeValueGreaterThanZero: ${isCodeValueGreaterThanZero}`);

    return isCodePropertyANumber && isCodeValueGreaterThanZero;
}