import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'citameapi2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
