import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	//** 全てのタスクを取得 */
	getAllTasks(): Task[] {
		return this.tasksService.getAllTasks();
	}
	//** タスクidを取得 */
	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksService.getTaskById(id);
	}
	@Post()
	//** タスク作成 */
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}

	@Delete('/:id')
	//** タスク削除 */
	deleteTask(@Param('id') id: string) {
		this.tasksService.deleteTask(id);
	}

	@Patch('/:id/status')
	//** タスク更新 */
	updateTaskStatus(
		@Param('id') id: string,
		@Body('status') status: TaskStatus
	) {
		return this.tasksService.updateTaskStatus(id, status);
	}
}
