import { Controller } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}
}
