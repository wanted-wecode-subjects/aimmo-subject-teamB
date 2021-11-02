import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async createUser(userCredentialsDto: UserCredentialsDto): Promise<{ access_token: string }> {
    const { username, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new this.userModel({ username, password: hashedPassword });
    try {
      await createdUser.save();
    } catch (e) {
      if (e.code === 11000) { // E11000 duplicate key error
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return this.logIn(userCredentialsDto);
  }

  async logIn(userCredentialsDto: UserCredentialsDto): Promise<{ access_token: string }> {
    const { username, password } = userCredentialsDto;
    const existedUser = await this.userModel.findOne({ username });
    if (existedUser && (await bcrypt.compare(password, existedUser.password))) {
      const payload = { username };
      const token = { access_token: this.jwtService.sign(payload)};
      return token;
    } else {
      throw new NotFoundException('User not found');      
    }
  }
}
