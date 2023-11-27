import { Injectable } from '@nestjs/common';

interface Token {
  content: string;
  expired: number;
}

const record: Token[] = [];

@Injectable()
export class TokenService {
  generateToken(username: string, password: string) {
    const token = {
      content: `username=${username}&&password=${password}`,
      expired: Date.now() + 6000,
    };
    record.push(token);
    return token;
  }

  verifyToken(content) {
    const currentTime = Date.now();
    return record.some(
      (item) => item.content === content && item.expired > currentTime,
    );
  }

  refreshToken(content) {
    const token = record.find((item) => item.content === content);
    token.expired = Date.now() + 6000;
    return token;
  }

  removeToken(content) {
    const index = record.findIndex((item) => item.content === content);
    record.splice(index, 1);
  }
}
