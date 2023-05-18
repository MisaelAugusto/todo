import { useMemo } from 'react';

import styles from './TodoList.module.css';

import NoTasks from './components/NoTasks';
import TaskComponent from './components/Task';

interface TodoListProps {
  tasks: Task[];
  toggleTaskDone: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleDuplicateTask: (task: Task) => void;
  handleEditTask: (task: Task) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  toggleTaskDone,
  handleDeleteTask,
  handleDuplicateTask,
  handleEditTask
}) => {
  const doneTasks = useMemo(() =>
    tasks.filter((task) => task.done).length
  , [tasks]);

  const totalTasks = useMemo(() => tasks.length, [tasks]);

  const doneText = useMemo(() =>
    totalTasks > 0 ? `${doneTasks} de ${totalTasks}` : totalTasks
  , [doneTasks, totalTasks]);

  return (
    <div className={styles.container}>
      <header className={styles.todoHeader}>
        <div className={`${styles.todoHeader} ${styles.created}`}>
          <p>Tarefas criadas</p>
          <span className={styles.totalsNumber}>{totalTasks}</span>
        </div>

        <div className={`${styles.todoHeader} ${styles.done}`}>
          <p>Concluídas</p>
          <span className={styles.totalsNumber}>{doneText}</span>
        </div>
      </header>

      {totalTasks === 0 && (<NoTasks />)}

      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            {...task}
            toggleTaskDone={() => toggleTaskDone(task.id)}
            handleDeleteTask={() => handleDeleteTask(task.id)}
            handleDuplicateTask={() => handleDuplicateTask(task)}
            handleEditTask={(newDescription) => handleEditTask({
              ...task,
              description: newDescription
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
