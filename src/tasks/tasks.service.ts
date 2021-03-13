import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}
  //** タスク取得 */
  async getTasks(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getTasks(filterDto);
  }
  //   //** 任意のタスクを一件取得 */

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask)
      throw new NotFoundException(`Task with ID "${id}" not found`);
    return foundTask;
  }

  //   //** タスク作成 */

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  //   //** タスクを絞り込んで取得 */
  //   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, searchWord } = filterDto;
  //     let tasks = this.getAllTasks();
  //     // 状態別
  //     if (status) tasks = tasks.filter((task) => task.status === status);
  //     // 検索
  //     if (searchWord) {
  //       tasks = tasks.filter(
  //         (task) =>
  //           task.title.includes(searchWord.toLowerCase()) ||
  //           task.description.includes(searchWord.toLowerCase())
  //       );
  //     }
  //     return tasks;
  //   }
  //   //** タスク削除 */
  async deleteTask(id: number): Promise<void> {
    const deletedTask = await this.taskRepository.delete(id);
    if (deletedTask.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(deletedTask);
    // DeleteResult { raw: [], affected: 1 }
  }
  //   //** タスク更新 */
  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
