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

export type Topic = {
  id: number;
  name: string;
  content: string;
  datetime_created: string;
  is_deleted: boolean;
};

export type ClassSubjectDetail = {
  id: number;
  name: string;
  general_subject: GeneralSubject;
  attached_class: Class;
  datetime_created: string;
  is_deleted: boolean;
  topics: {
    pagination: {
      next: string | null;
      previous: string | null;
      count: number;
    },
    data: Array<Topic>
  };
};

export type ClassSubjectShort = {
  id: number;
  name: string;
  is_deleted: boolean;
  datetime_created: string;
};