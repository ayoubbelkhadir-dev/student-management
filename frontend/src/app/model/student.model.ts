export interface Student {
    id:number;
    firstname:String;
    lastname:String;
    code:String;
    programeId:String;
    photo:String;
}
export interface Payment {
    id :number;
    file : string;
    date : string;
    amount : number;
    type : PaymentType;
    status : PaymentStatus;
    student : Student;

}
export enum  PaymentType{
    CASH,CHECK,TRANSFER,DEPOSE
}
export enum  PaymentStatus{
    CREATED,VALIDATED,REJECTED
}

export interface AppUser{
    id:number;
    username:string;
    password:string;
    avatar:string;
    roles:Array<AppRole>;
}
export interface AppRole{
    id:number;
    nameRole:string;
}