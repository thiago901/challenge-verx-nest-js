import { HasherProvider } from "@application/users/application/ports/providers/hasher.provider";
import { Module } from "@nestjs/common";
import { BcryptHash } from "./bcrypt-hasher";
import { JWTEncrypter } from "./jwt-encrypter";
import { EncrypterProvider } from "@application/users/application/ports/providers/encrypter.provider";




@Module({
  providers: [
    {
      provide: HasherProvider,
      useClass: BcryptHash,
    },
    {
      provide: EncrypterProvider,
      useClass: JWTEncrypter,
    },
  ],
  exports: [HasherProvider,EncrypterProvider],
})
export default class ProvidersModule {}
