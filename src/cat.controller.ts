import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cat')
export class CatController {
  constructor(private readonly appService: AppService) {}

  @Get(':color')
  getColorCat(@Param('color') color: string): string {
    return `You get a ${color} cat.`;
  }
}
