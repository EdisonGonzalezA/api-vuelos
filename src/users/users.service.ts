import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { IUser } from './user.interface';
import { USER } from 'src/models/models';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(USER.name) private readonly modelo: Model<IUser>){}
    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    async insertar(userDTO:UserDTO):Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.modelo({...userDTO, password: hash});
        return await newUser.save();
    }
}
