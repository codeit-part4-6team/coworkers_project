export interface TaskCreateRequestBody {
  name: string;
  description: string;
  startDate: string;
  frequencyType: string;
  monthDay: number;
}

export interface TaskEditRequestBody {
  name: string;
  description: string;
  done: boolean;
}
