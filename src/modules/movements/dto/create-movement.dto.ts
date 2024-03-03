export interface ICreateMovementDTO {
    type: 'REVENUE' | 'EXPENSE';
    value: number;
    category: string;
    description?: string;
    user_id: string;
}
