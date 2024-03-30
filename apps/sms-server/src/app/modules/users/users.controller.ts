import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserEntity } from '../../domain/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Post('create')
    async createUser(@Body() user: UserEntity) {
        return await this.userService.create(user)
    }
}
