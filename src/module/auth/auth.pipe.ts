import { JoiValidationPipe } from '@common/pipes/joi-validations.pipe';
import * as Joi from 'joi';
import {
  ChangePassDTO,
  DevicesDto,
  forgotPasswordDto,
  LoginDto,
  RegisterDTO,
} from 'src/dto/auth.dto';

export class LoginPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<LoginDto>({
      hp: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
  }
}
export class RegisterPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<RegisterDTO>({
      name: Joi.string().trim().required(),
      email: Joi.string().optional().allow('', null).email().messages({
        'string.email': 'E-mail yang di masukan salah / tidak sesuai',
      }),
      hp: Joi.string()
        .trim()
        .min(9)
        .max(16)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
          'string.base': `hp should be a type of 'text'`,
          'string.min': 'hp has to be least {#limit} characters.',
          'string.max': 'hp has to be max {#limit} characters.',
          'string.pattern.base': 'hp must be a number',
          'any.required': `hp is a required field`,
        }),
      ktp: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      tnc: Joi.boolean().required(),
      password: Joi.string().trim().allow(''),
    });
  }
}
