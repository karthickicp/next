export interface users {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string;
}
export interface createEditModalProps {
    open: boolean,
    type: string,
    user: users | null
}