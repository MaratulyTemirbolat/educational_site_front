export type User = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    datetime_created: Date,
    isDeleted: boolean,
    isStaff: boolean,
    isActive: boolean,
    groups: Array<any>,
    student: any,
    teacher: any
};