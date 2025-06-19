export interface IColumn {
    id: number;
    title: string;
    cards: ICard[];
    disabled?: boolean;
    sort?: 'asc' | 'desc';
    lastEdited?: Date;
    new?: boolean;
}

export interface ICard {
    id: number;
    title: string;
    description: string;
    new?: boolean;
}