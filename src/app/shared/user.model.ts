export class Users {
    _id!: string;
    login!: string; 
    password! : string;
    lastName! : string;
    firstName! : string;
    accessType! : string;
    civility! : string;
    uploadedPicture! : string;
    lastUpdateDate! : Date;
    picture! : string;
  }

  export enum AccessType {
    Student = 'student',
    Admin = 'admin',
    Teacher = 'teacher'
  }