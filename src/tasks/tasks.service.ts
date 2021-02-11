import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	//** 全てのタスクの取得 */
	getAllTasks() {
		return this.tasks;
	}
	//** 任意のタスクを一件取得 */
	getTaskById(id: string): Task {
		// 取得対象のタスク
		const found = this.tasks.find((task) => task.id === id);
		// 取得対象のタスクがない
		if (!found) throw new NotFoundException(`Task with ID "${id}" not found`);
		return found;
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

	//** タスクを絞り込んで取得 */
	getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const { status, searchWord } = filterDto;
		let tasks = this.getAllTasks();

		// 状態別
		if (status) tasks = tasks.filter((task) => task.status === status);
		// 検索
		if (searchWord) {
			tasks = tasks.filter(
				(task) =>
					task.title.includes(searchWord.toLowerCase()) ||
					task.description.includes(searchWord.toLowerCase())
			);
		}

		return tasks;
	}

	//** タスク削除 */
	deleteTask(id: string) {
		const found = this.getTaskById(id);
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}

	//** タスク更新 */
	updateTaskStatus(id: string, status: TaskStatus) {
		const task = this.getTaskById(id);
		task.status = status;
		return task;
	}
}
