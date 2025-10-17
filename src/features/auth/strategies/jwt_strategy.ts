import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';

export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService:ConfigService){
        
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:configService.get<string>("JWT_SECRET") || ''
        })
    }
    async validate(payload: any){
        return {id:payload.id , role:payload.role, name:payload.name}
    }
}