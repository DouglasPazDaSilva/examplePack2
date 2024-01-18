export interface GlobalError {
    status: number;
    code: number;
    message: string;
}
export declare function handleError(error: unknown): GlobalError;
