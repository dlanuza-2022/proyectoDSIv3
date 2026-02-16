import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'AZXY8899*',
        });
    }

    async validate(payload: any) {
        console.log('VALIDATE PAYLOAD:', payload);
        return {
            userId: payload.id,
            email: payload.email,
            role: payload.role,
        };
    }
}