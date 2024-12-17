import { JoiValidationPipe } from '@common/pipes/joi-validations.pipe';
import * as Joi from 'joi';
import { UserUpdateDTO } from 'src/dto/user.dto';

export class UserUpdatePipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<UserUpdateDTO>({
      field: Joi.string().allow('email', 'picture'),
      dataEdit: Joi.string().trim(),
    });
  }
}
