
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

    const updateTodo = useCallback(async (id: string, payload: any) => {
        const response = await api.put(
            `/todo/updateTodo/${id}`,
            payload
        );
        return response.data;
    }, []);

    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTodoText, setNewTodoText] = useState('');

    useEffect(() => {
        (async () => {
            const todoData = (await getTodos()).data.todoData;
            setTodos(todoData);
        })();
    }, []);

    const handleAddTodo = async () => {
        if (newTodoText.trim()) {
            const newTodo = await createTodo({ todo: newTodoText, state: false });
            setTodos([...todos, newTodo]);
            setNewTodoText('');
            setIsModalOpen(false);
        }
    };

    const handleToggleState = async (id: string, currentState: boolean) => {
        await updateTodo(id, { state: !currentState });
        setTodos(todos.map(todo => todo.id === id ? { ...todo, state: !currentState } : todo));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo Listesi</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded"
                >
                    Yeni Todo Ekle
                </button>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left">Todo</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Durum</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos?.map((todo) => (
                            <tr key={todo.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{todo.todo}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <span className={`px-2 py-1 rounded ${todo.state ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                        {todo.state ? "Tamamlandı" : "Tamamlanmadı"}
                                    </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleToggleState(todo.id, todo.state)}
                                        className="bg-yellow-500 hover:bg-yellow-700  font-bold py-1 px-2 rounded mr-2"
                                    >
                                        {todo.state ? "Tamamlanmadı Yap" : "Tamamlandı Yap"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Yeni Todo Ekle</h2>
                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder="Todo metnini girin"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 bg-gray-500 hover:bg-gray-700  font-bold py-2 px-4 rounded"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleAddTodo}
                                className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded"
                            >
                                Ekle
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}