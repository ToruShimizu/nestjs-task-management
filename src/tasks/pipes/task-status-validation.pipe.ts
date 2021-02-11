import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
	// タスクの状態
	readonly allowedStatuses = [
		TaskStatus.OPEN,
		TaskStatus.IN_PROGRESS,
		TaskStatus.DONE,
	];
	// PipeTransformにある関数
	transform(value: any) {
		value = value.toUpperCase();

		// statusをチェック
		if (!this.isStatusValid(value))
			throw new BadRequestException(`"${value}" is an invalid status`);

		return value;
	}
	private isStatusValid(status: any) {
		// 対象のstatusは正しいか
		const idx = this.allowedStatuses.indexOf(status);
		return idx !== -1;
	}
}
