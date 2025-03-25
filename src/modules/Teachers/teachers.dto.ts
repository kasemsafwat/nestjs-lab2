import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Ahmed Ali' })
  name: string;

  @ApiProperty({ example: 'Math' })
  subject: string;
}

export class UpdateTeacherDto {
  @ApiProperty({ example: 'Ahmed Ali' })
  name?: string;

  @ApiProperty({ example: 'Physics' })
  subject?: string;
}
