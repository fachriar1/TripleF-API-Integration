import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './eVoucher.entity';
import { VoucherRepository } from './eVoucher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  providers: [VoucherRepository],
  exports: [TypeOrmModule, VoucherRepository],
})
export class VoucherModule {}
