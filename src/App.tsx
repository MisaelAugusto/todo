import { useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { Header, NewTaskInput, TodoList } from 'components';

import styles from './App.module.css';

import './global.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddNewTask = useCallback((newTask: Task) => {
    setTasks((previousState => [...previousState, newTask]));
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((previousState =>
      previousState.filter((task) => task.id !== taskId)
    ));
  }, []);

  const handleDuplicateTask = useCallback((task: Task) => {
    handleAddNewTask({
      id: uuidV4(),
      description: `${task.description} - copy`,
      done: false
    });
  }, [handleAddNewTask]);

  const toggleTaskDone = useCallback((taskId: string) => {
    setTasks((previousState =>
      previousState.map((task) => {
        return {
          ...task,
          ...(task.id === taskId && { done: !task.done })
        };
      })
    ));
  }, []);

  const handleEditTask = useCallback((editedTask: Task) => {
    setTasks((previousState =>
      previousState.map((task) => {
        return {
          ...task,
          ...(task.id === editedTask.id && { description: editedTask.description})
        };
      })
    ));
  }, []);

  return (
    <div className={styles.app}>
      <Header />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        maxWidth: '46rem',
        alignItems: 'center'
      }}>
        <NewTaskInput handleAddNewTask={handleAddNewTask} />

        <TodoList
          tasks={tasks}
          toggleTaskDone={toggleTaskDone}
          handleDeleteTask={handleDeleteTask}
          handleDuplicateTask={handleDuplicateTask}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  );
};

export default App
