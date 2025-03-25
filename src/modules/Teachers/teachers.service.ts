import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from './teachers.dto';

@Injectable()
export class TeachersService {
  private teachers = [{ id: 1, name: 'Ahmed Ali', subject: 'Math' }];

  findAll() {
    return this.teachers;
  }

  create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = { id: this.teachers.length + 1, ...createTeacherDto };
    this.teachers.push(newTeacher);
    return newTeacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacherIndex = this.teachers.findIndex((t) => t.id === id);
    if (teacherIndex === -1) throw new NotFoundException('Teacher not found');

    this.teachers[teacherIndex] = {
      ...this.teachers[teacherIndex],
      ...updateTeacherDto,
    };
    return this.teachers[teacherIndex];
  }

  delete(id: number) {
    const teacherIndex = this.teachers.findIndex((t) => t.id === id);
    if (teacherIndex === -1) throw new NotFoundException('Teacher not found');

    return this.teachers.splice(teacherIndex, 1);
  }
}
