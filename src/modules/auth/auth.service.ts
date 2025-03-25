import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  private users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('1234', 10) },
  ];

  async signUp(userData) {
    const existingUser = this.users.find(
      (u) => u.username === userData.username,
    );
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: this.users.length + 1,
      username: userData.username,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return { message: 'User registered successfully' };
  }
  async signIn(userData) {
    const user = this.users.find((u) => u.username === userData.username);
    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 🔹 استخدام `JWT_SECRET` من `ConfigService`
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '1h' },
    );

    return { token };
  }
}
