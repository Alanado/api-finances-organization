import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { MovementModule } from './modules/movements/movement.module';

@Module({
    imports: [UserModule, LoginModule, MovementModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
