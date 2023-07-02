export type User = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    datetime_created: string,
    is_deleted: boolean,
    is_staff: boolean,
    is_active: boolean,
    groups: Array<any>,
    student: any,
    teacher: any
};

