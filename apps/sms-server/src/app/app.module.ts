import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './domain/entities/user.entity';
import { ConfigModule } from '@nestjs/config'
import { AccessTokenGuard } from './shared/guards';
import { LoggerMiddleware } from './domain/middleware/logger.middleware';
import { UserEntity } from './domain/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: [UserEntity], 
    synchronize: true, // You can set this to false in production
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: "APP_GUARD",
    useClass: AccessTokenGuard,
  }],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}