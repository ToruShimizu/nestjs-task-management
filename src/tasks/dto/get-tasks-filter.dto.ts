import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
	status: TaskStatus;
	searchWord: string;
}
