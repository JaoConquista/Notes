export interface INoteContent {
    id: number,
    userId: number,
    title: string,
    content: string,
    color: string,
    image: string,
    tagId?: string
}