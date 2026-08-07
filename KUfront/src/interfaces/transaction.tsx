export  interface Transaction {
    id: number;
    type: 'ingreso' | 'egreso';
    amount: number;
    category: string;
    date: string;
    description: string;
}