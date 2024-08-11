import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
    messages;

    constructor(response: any) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}

// TODO: Check this in form validation

@Injectable()
export class ValidateInputPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const metatype = metadata.metatype;

        // Ignore validation for non-class types and primitives
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const obj = plainToInstance(metatype, value);
        const errors = await validate(obj);

        if (errors.length > 0) {
            // Build the validation error response
            const messages = errors.reduce((acc, error: ValidationError) => {
                const constraints = error.constraints;
                if (constraints) {
                    // @ts-ignore
                    acc[error.property] = Object.keys(constraints).reduce(
                        (accField, key) => ({
                            ...accField,
                            [key]: constraints[key],
                        }),
                        {},
                    );
                }
                return acc;
            }, {});
            throw new ValidationException(messages);
        }

        return value;
    }

    // Helper method to determine if a metatype should be validated
    private toValidate(metatype: Function): boolean {
        const types = [String, Boolean, Number, Array, Object];
        // @ts-ignore
        return !types.includes(metatype);
    }
}
