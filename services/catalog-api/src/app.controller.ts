import { Controller, Get, Inject, Query } from '@nestjs/common';

@Controller()
export class AppController {
  private start: number;

  constructor() {
    this.start = Date.now();
  }

  @Get('health')
  async health() {
    const now = Date.now();
    return {
      status: 'API Online',
      uptime: Number((now - this.start) / 1000).toFixed(0),
    };
  }
}
