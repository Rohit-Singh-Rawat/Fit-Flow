export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  path:string
  authorId: string;
}
export interface GetQuestionParams {
  page?: number;
  pagesize?: number;
  searchQuery?: string;
  filter?: string;
}
