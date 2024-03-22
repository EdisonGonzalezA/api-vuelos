import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validarusuario(username: string, password: string): Promise<any> {
    const user = await this.userService.BuscarporNombre(username);

    const isValidPassword = await this.userService.verficaContrasenia(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;
    return null;
  }
  async singIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
  async singUp(userDTO: UserDTO) {
    return this.userService.insertar(userDTO);
  }
}