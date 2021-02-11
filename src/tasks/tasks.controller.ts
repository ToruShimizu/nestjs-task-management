import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	//** タスクを絞り込んで取得 */
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.tasksService.getTasksWithFilters(filterDto);
		} else {
			return this.tasksService.getAllTasks();
		}
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
