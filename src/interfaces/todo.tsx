export interface ITodoListResponse {
    data: ITodoPagerData
    success: boolean
    message: string
    userMessage: string
}

export interface ITodoPagerData {
    todoData: ITodo[]
    pagerData: IPagerData
}

export interface ITodo {
    id: string
    todo: string
    state: boolean
    user: string
}

export interface IPagerData {
    page: number
    size: number
    totalPage: number
    totalCount: number
}

