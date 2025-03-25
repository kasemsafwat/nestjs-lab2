import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto, UpdateSchoolDto } from './schools.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Schools')
@ApiBearerAuth()
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolsService.create(createSchoolDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  findAll() {
    return this.schoolsService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a school' })
  @ApiResponse({ status: 200, description: 'School updated successfully' })
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolsService.update(+id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a school' })
  @ApiResponse({ status: 200, description: 'School deleted successfully' })
  delete(@Param('id') id: string) {
    return this.schoolsService.delete(+id);
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get school analytics (most and least teachers)' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  getAnalytics() {
    return this.schoolsService.getAnalytics();
  }
}
