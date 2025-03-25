import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Cairo International School' })
  name: string;

  @ApiProperty({ example: 'Cairo' })
  location: string;
}

export class UpdateSchoolDto {
  @ApiProperty({ example: 'Updated School Name' })
  name?: string;

  @ApiProperty({ example: 'Alexandria' })
  location?: string;
}
