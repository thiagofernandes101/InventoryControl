import * as productCategoryFieldsSpecification from './specifications/ProductCategoryFieldsSpecification';

export function IsValid(productCategoryView) {
    let hasRequiredFieldsBeenFilled = productCategoryFieldsSpecification.HasRequiredFieldsBeenFilled(productCategoryView);
    let isCodePropertyAValidNumber = productCategoryFieldsSpecification.IsCodePropertyAValidNumber(productCategoryView.code);
    
    return hasRequiredFieldsBeenFilled && isCodePropertyAValidNumber;
}