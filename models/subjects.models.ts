export type Class = {
  id: number;
  number: number;
  datetime_created: string;
  is_deleted: boolean;
};

export type GeneralSubject = {
  id: number;
  name: string;
  datetime_created: string;
  is_deleted: boolean;
};

export type ClassSubject = {
  id: number;
  name: string;
  general_subject: GeneralSubject;
  attached_class: Class;
  datetime_created: string;
  is_deleted: boolean;
};