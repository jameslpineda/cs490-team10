export interface UserInterface {
    _id?: string;
    email: string;
    password?: string;
    resetPasswordToken?: string | null;
    resetPasswordExpireTime?: number | null;
}