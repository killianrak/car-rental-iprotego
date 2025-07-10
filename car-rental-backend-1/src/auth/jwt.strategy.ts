import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'carrental',
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); 
    const user = await this.authService.findById(payload.sub);
    console.log('User found:', user); 
    return user;
  }
}