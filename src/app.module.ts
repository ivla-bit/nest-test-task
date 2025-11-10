import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JudgeModule } from './judge/judge.module';
import { ParticipantModule } from './participant/participant.module';
import { VoteModule } from './vote/vote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
    JudgeModule,
    ParticipantModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
