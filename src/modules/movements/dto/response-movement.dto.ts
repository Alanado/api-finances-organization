export interface IResponseMovement {
    id: string;
    type: 'REVENUE' | 'EXPENSE';
    category: string;
    value: number;
    description?: string;
    userId: string;
    created_at: Date;
    updated_at: Date;
}
