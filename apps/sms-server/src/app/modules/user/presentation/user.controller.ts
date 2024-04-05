import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../application/user.service';
import type { UserEntity } from '../../../domain/entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('create')
    async createUser(@Body() user: UserEntity) {
        return await this.userService.create(user)
    }
}
