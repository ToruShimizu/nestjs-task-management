import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	//** 全てのタスクを取得 */
	getAllTasks(): Task[] {
		return this.tasksService.getAllTasks();
	}
	@Post()
	createTask(
		@Body('title') title: string,
		@Body('description') description: string
	) {
		return this.tasksService.createTask(title, description);
	}
}
