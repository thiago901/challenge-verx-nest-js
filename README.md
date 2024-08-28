
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Envs setup
Use the ".env.example" file to configure the required envs

```bash
# Generate private Key
$ openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

```bash
# Generate public Key
$ openssl rsa -pubout -in private_key.pem -out public_key.pem
```

```bash
# Generate private Key to base64 in oneline powershell
$privateKey = [System.IO.File]::ReadAllText("private_key.pem")
$base64PrivateKey = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($privateKey))
$base64PrivateKey -replace "`r`n", "" | Out-File -Encoding ASCII private_key_base64_oneline.pem

```
```bash
# Generate public Key to base64 in oneline  powershell
$publicKey = [System.IO.File]::ReadAllText("public_key.pem")
$base64PublicKey = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($publicKey))
$base64PublicKey -replace "`r`n", "" | Out-File -Encoding ASCII public_key_base64_oneline.pem


```


## Project setup

```bash
# Up database
$ docker-compose up -d
```

```bash
# Run all migrations
$ npm run prisma:migrate
```


```bash
# Instal all dependencies
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
