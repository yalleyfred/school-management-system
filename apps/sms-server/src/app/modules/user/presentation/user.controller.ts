import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { NewUserDTO } from '../../../domain/dtos/auth.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('create')
    async createUser(@Body() user: NewUserDTO) {
        return await this.userService.create(user)
    }
}
