import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // Makes it available everywhere
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}