import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto, UpdateSchoolDto } from './schools.dto';

@Injectable()
export class SchoolsService {
  private schools = [
    {
      id: 1,
      name: 'Cairo International School',
      location: 'Cairo',
      teachersCount: 10,
    },
    {
      id: 2,
      name: 'Alexandria Modern School',
      location: 'Alexandria',
      teachersCount: 5,
    },
  ];

  findAll() {
    return this.schools;
  }

  create(createSchoolDto: CreateSchoolDto) {
    const newSchool = {
      id: this.schools.length + 1,
      teachersCount: 0,
      ...createSchoolDto,
    };
    this.schools.push(newSchool);
    return newSchool;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    const schoolIndex = this.schools.findIndex((s) => s.id === id);
    if (schoolIndex === -1) throw new NotFoundException('School not found');

    this.schools[schoolIndex] = {
      ...this.schools[schoolIndex],
      ...updateSchoolDto,
    };
    return this.schools[schoolIndex];
  }

  delete(id: number) {
    const schoolIndex = this.schools.findIndex((s) => s.id === id);
    if (schoolIndex === -1) throw new NotFoundException('School not found');

    return this.schools.splice(schoolIndex, 1);
  }

  getAnalytics() {
    if (this.schools.length === 0) {
      throw new NotFoundException('No schools available');
    }

    const mostTeachers = this.schools.reduce((prev, current) =>
      prev.teachersCount > current.teachersCount ? prev : current,
    );
    const leastTeachers = this.schools.reduce((prev, current) =>
      prev.teachersCount < current.teachersCount ? prev : current,
    );

    return { mostTeachers, leastTeachers };
  }
}
