import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	//** 全てのタスクの取得 */
	getAllTasks() {
		return this.tasks;
	}

	//** タスク作成 */
	createTask(title: string, description: string) {
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		};
		this.tasks.push(task);
		return task;
	}
}
