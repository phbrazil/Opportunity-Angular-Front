export class TimeTask {
  idTime: number
  idUser: number
  project: string
  time: string
  date: string
  task: string
  notes: string
  status: ChangeStatusEnum
}

export interface ChangeStatus extends TimeTask{
  status: ChangeStatusEnum
}

export enum ChangeStatusEnum {
  paid = 'paid',
  open = 'open',
}
