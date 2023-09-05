enum TaskStatus {
  'TODO' = 1,
  'EXECUTION' = 2,
  'DONE' = 3
}
export default TaskStatus

export class Task{
  id: number = 0;
  creator_id: number = 0;
  owner_id: string = "";
  task_name: string = "";
  task_description: string = "";
  status: TaskStatus = TaskStatus.TODO;
  created_at: string = '';
  updated_at: string = '';

  constructor(data: Partial<Task> = {}) {
    Object.assign(this, data);
  }

}
