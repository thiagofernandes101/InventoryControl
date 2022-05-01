import * as productCategoryFieldsSpecification from './specifications/ProductCategoryFieldsSpecification';

export function IsValid(productCategoryView) {
    console.log("chamada do método de validação");
    let hasRequiredFieldsBeenFilled = productCategoryFieldsSpecification.HasRequiredFieldsBeenFilled(productCategoryView);
    console.log(`value of required field validation: ${hasRequiredFieldsBeenFilled}`);
    let isCodePropertyAValidNumber = productCategoryFieldsSpecification.IsCodePropertyAValidNumber(productCategoryView.code);
    console.log(`value of code property validation: ${isCodePropertyAValidNumber}`);
    
    return hasRequiredFieldsBeenFilled && isCodePropertyAValidNumber;
}