import {
  CreateUserDto,
  SignInDto,
  SignInResponseDto,
  User,
  UserDocument,
  UserResponseDto,
} from '@mood-tracker/api-interfaces';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { name, email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const userCreated = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      return {name: userCreated.name, email: userCreated.email};
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // duplicate email
        throw new ConflictException('Email already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please try again.');
    }
  }
}
