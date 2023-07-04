export type ChatUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  datetime_created: string;
  is_deleted: boolean;
};
  
export type StudentTeacherInChat = {
  tought_subjects?: Array<any>;
  status_subscription?: any;
  id: number;
  user: ChatUser;
};

export type PersonalChat = {
  id: number;
  student: StudentTeacherInChat;
  teacher: StudentTeacherInChat;
  datetime_created: string;
  is_deleted: boolean;
};

export type ChatMessage = {
  id: number;
  content: string;
  owner: ChatUser;
  datetime_created: string;
  is_deleted: boolean;
};

export type DetailedChat = {
  id: number;
  is_deleted: boolean;
  datetime_created: string;
  student: StudentTeacherInChat;
  teacher: StudentTeacherInChat;
  messages: {
    pagination?: {
      next: string | null;
      previous: string | null;
      count: number;
    };
    data: Array<ChatMessage>
  };
};

