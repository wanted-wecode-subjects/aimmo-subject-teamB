import { Injectable } from '@nestjs/common';
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
}
