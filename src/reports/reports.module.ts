import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reports])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}

// NOTES (SEC 8):
// Same as in User Module file.