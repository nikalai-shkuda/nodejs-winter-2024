import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const payload = plainToInstance(metatype, value);
    const errors = await validate(payload);

    if (errors.length > 0) {
      const formatedErrors = errors.map((el) => ({
        property: el.property,
        messages: Object.values(el.constraints),
      }));

      throw new BadRequestException({
        errors: formatedErrors,
        message: 'Validation failed',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return value;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
