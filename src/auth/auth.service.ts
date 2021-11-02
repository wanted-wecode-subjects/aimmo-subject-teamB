import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(userCredentialsDto: UserCredentialsDto): Promise<User> {
    const { username, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new this.userModel({ username, password: hashedPassword });
    return await createdUser.save();
  }

  async logIn(userCredentialsDto: UserCredentialsDto): Promise<User> {
    const existedUser = await this.userModel.findOne(userCredentialsDto);
    if (!existedUser) {
      throw new NotFoundException('User not found');
    }
    return existedUser;
  }
}
