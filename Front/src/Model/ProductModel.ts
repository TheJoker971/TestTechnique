import {ICategory} from "./CategoryModel";

export interface IProduct {
    id:number;
    nom:string;
    description:string;
    prix:number;
    categorie:ICategory;
}