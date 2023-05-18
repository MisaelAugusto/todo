import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { PlusCircle } from 'phosphor-react';

import styles from './NewTaskInput.module.css';

interface NewTaskInputProps {
  handleAddNewTask: (newTask: Task) => void;
}

const NewTaskInput: React.FC<NewTaskInputProps> = ({ handleAddNewTask }) => {
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const isNewTaskDescriptionEmpty = useMemo(() =>
    newTaskDescription.length === 0
  , [newTaskDescription]);

  const handleChangeNewTaskDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(event.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    handleAddNewTask({
      id: uuidV4(),
      description: newTaskDescription,
      done: false
    });

    setNewTaskDescription('');
  }, [handleAddNewTask, newTaskDescription]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="new-task"
        placeholder="Adicione uma nova tarefa"
        value={newTaskDescription}
        onChange={handleChangeNewTaskDescription}
      />

      <button
        className={styles.button}
        onClick={handleAdd}
        disabled={isNewTaskDescriptionEmpty}
      >
        <p>Criar</p>
        <PlusCircle size={20} />
      </button>
    </div>
  );
};

export default NewTaskInput;
