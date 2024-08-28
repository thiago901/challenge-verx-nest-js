
import { EncrypterProvider } from "@application/users/application/ports/providers/encrypter.provider";

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JWTEncrypter implements EncrypterProvider{
  constructor(private jwtService:JwtService){}


  encrypt(payload: Record<string,unknown>): Promise<string> {  
    return this.jwtService.signAsync(payload);
  }
  
}