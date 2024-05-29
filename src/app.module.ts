import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Users } from './graphql/models/Users';
import { ClassroomMembers } from './graphql/models/ClassroomMembers';
import { Classrooms } from './graphql/models/Classrooms';
import { UsersModule } from './users/users.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ClassroomMembersModule } from './classroom_members/classroomMembers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local', '.env.development', '.env.development.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, ClassroomMembers, Classrooms],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ClassroomsModule,
    ClassroomMembersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
