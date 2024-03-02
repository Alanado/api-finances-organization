import { Body, Controller } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { ILoginDTO } from './dto/login.dto';

@Controller('/login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    async login(@Body() data: ILoginDTO) {
        return this.loginService.execute({ ...data });
    }
}
