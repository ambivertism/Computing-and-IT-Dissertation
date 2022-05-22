import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'admin',
      pass: 'password',
      autoIndex: true,
    }),
  ]
}) 
export class AppModule {}
