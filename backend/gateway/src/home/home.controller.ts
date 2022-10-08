import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Public } from 'src/auth/shared/decorators/public.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Public()
  @UseInterceptors(FilesInterceptor('files'))
  @Post('upload')
  uploadFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body('id')
    id: string
  ) {
    return this.homeService.uploadFiles(id, files);
  }

  @Public()
  @Post('create')
  create(
    @Body('house')
    createHome: CreateHomeDto 
  ) {
    return this.homeService.create(createHome);
  }

  @Public()
  @Get()
  findAll() {
    return this.homeService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(id, updateHomeDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(id);
  }
}
