import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { MenuRepository } from './menu.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuRepository],
  exports: [TypeOrmModule, MenuRepository],
})
export class MenuModule {}
