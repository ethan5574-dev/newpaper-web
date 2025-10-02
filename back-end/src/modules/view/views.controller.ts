import { Controller, Get, Param, Post } from '@nestjs/common';
import { ViewsService } from './views.service';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Get(':id')
  getViewCount(@Param('id') id: string) {
    return this.viewsService.getAllViewCount(+id);
  }

  @Post(':id')
  incrementView(@Param('id') id: string) {
    return this.viewsService.incrementView(+id);
  }
}