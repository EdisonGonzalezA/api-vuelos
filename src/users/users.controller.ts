import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';

@Controller('api/v1/users')
export class UsersController {
    constructor (private userService:UsersService){}

    @Post()
    insertar(@Body() userDTO: UserDTO){
        return this.userService.insertar(userDTO);
    }
}
