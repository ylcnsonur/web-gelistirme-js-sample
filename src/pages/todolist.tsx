
import React, { useCallback, useEffect, useState } from 'react';
import { api } from '../context/file';
import type { ITodoListResponse, ITodo } from '../interfaces/todo';

export const TodoListPage: React.FC = () => {


    const getTodos = useCallback(async () => {
        const response = await api.post("/todos");
        return response.data as ITodoListResponse;
    }, []);


    const createTodo = useCallback(async (payload: any): Promise<ITodo> => {
        const response = await api.post<ITodo>("/todo/addTodo", payload);
        return response.data;
    }, []);


    const updateTodo = useCallback(async (id: number, payload: any) => {
        const response = await api.put(
            `/todo/updateTodo/${id}`,
            payload
        );
        return response.data;
    }, []);


    const [todos, setTodos] = useState<ITodo[]>([]);


    useEffect(() => {

        (async () => {
            const todoData = (await getTodos()).data.todoData;
            setTodos(todoData);
        })();

    }, []);

    return (
        <div>
            <h1>Test Sayfası</h1>
            <p>Bu, örnek bir React bileşenidir.</p>
           
            {
                todos?.map((todo) => (
                    <div key={todo.id}>
                        <h3>{todo.todo}</h3>
                        <p>Durum: {todo.state ? "Tamamlandı" : "Tamamlanmadı"}</p>
                    </div>
                ))
            }
        </div>
    );
}   