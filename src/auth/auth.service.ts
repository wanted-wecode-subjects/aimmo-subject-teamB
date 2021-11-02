import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userCredentialsDto: UserCredentialsDto): Promise<User> {
    const createdUser = new this.userModel(userCredentialsDto);
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
