import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginDTO } from './dto/login.dto';

@Controller('/login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    async login(@Body() data: LoginDTO) {
        return this.loginService.execute({ ...data });
    }
}
