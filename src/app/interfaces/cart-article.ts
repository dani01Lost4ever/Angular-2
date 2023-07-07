import { Article } from "./article";

export interface CartArticle extends Article {
  quantity: number;
}
