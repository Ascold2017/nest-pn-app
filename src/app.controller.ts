import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getWatchedPorns(): Promise<any> {
    return this.appService.getWatchResults();
  }

  @Post()
  async addWatchedPorn(@Body() body) {
    console.log(body)
    return this.appService.addWatchResult({ video: body.base64, pornId: body.id });
  }
}
