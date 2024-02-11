export class Food{
    id!: string;
    name!: string;
    price!: number;
    tags?: string[];
    favorite: boolean = false;
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
}