export interface IColumn {
    id: number;
    title: string;
    cards: ICard[];
    disabled?: boolean;
}

export interface ICard {
    id: number;
    title: string;
    description: string;
    new?: boolean;
}