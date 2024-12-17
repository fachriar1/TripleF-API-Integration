import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  token: string;
}

export class RegisterDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  hp: string;
  @ApiProperty()
  ktp: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  tnc: boolean;
}

export class DevicesDto {
  @ApiProperty()
  imei: string;
  @ApiProperty()
  devicetype: string;
  @ApiProperty()
  language: string;
  @ApiProperty()
  manufacturer: string;
  @ApiProperty()
  model: string;
  @ApiProperty()
  os: string;
  @ApiProperty()
  osVersion: string;
  @ApiProperty()
  region: string;
  @ApiProperty()
  sdkVersion: string;
  @ApiProperty()
  heightdips: number;
  @ApiProperty()
  heightpixels: number;
  @ApiProperty()
  scale: number;
  @ApiProperty()
  widthdips: number;
  @ApiProperty()
  widthpixels: number;
  @ApiProperty()
  player_id: string;
  @ApiProperty()
  firebase_id: string;
}

export class LoginDto {
  @ApiProperty()
  hp: string;
  @ApiProperty()
  password: string;
}

export class ChangePassDTO {
  @ApiProperty()
  password: string;
  @ApiProperty()
  retype: string;
}

export class emailValidationDto {
  @ApiProperty()
  email: string;
}

export class forgotPasswordDto {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  reNewPassword: string;
}

export class ValidasiPassDTO {
  @ApiProperty()
  password: string;
}
