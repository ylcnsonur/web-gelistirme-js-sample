import { useMemo, useState } from 'react';
import './App.css'
import { TodoListPage } from './pages/todolist';
import { TodoListPage as TLP } from './pagesWithTailwind/todolist';

function App() {
  const [isNewViewMode, setIsNewViewMode] = useState<boolean>(false);


  const ButtonJSX = useMemo(() => {
    return <>
      <div>
        <button onClick={() => setIsNewViewMode(!isNewViewMode)}>
          Değiştir
        </button>
      </div>
    </>
  }, [isNewViewMode]);


  return <>
    {ButtonJSX}
    {isNewViewMode ? <TLP /> : <TodoListPage />}
  </>

}

export default App
