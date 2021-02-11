import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	//** 全てのタスクの取得 */
	getAllTasks() {
		return this.tasks;
	}
	//** タスクidを取得 */
	getTaskById(id: string): Task {
		return this.tasks.find((task) => task.id === id);
	}

	//** タスク作成 */
	createTask(createTaskDto: CreateTaskDto) {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		};
		this.tasks.push(task);
		return task;
	}

	//** タスク削除 */
	deleteTask(id: string) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}
}
