import { registerDecorator, ValidationOptions,ValidationArguments } from "class-validator";

export function IsDatePast(validationOptions: ValidationOptions){
    return function (object: Object ,  propertyName: string){
        registerDecorator({
            name: 'isDatePaste',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator:{
                validate(value: any){
                    if(!(value instanceof Date))return false;
                    const today = new Date();
                    return value <= today;
                },
                defaultMessage(args: ValidationArguments){
                    return `${args.property} must a date in the passed`;
                },
            }
        });
    }
} 