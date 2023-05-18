import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Trash, Check, Copy, PencilSimple } from "phosphor-react";

import styles from './Task.module.css';

interface TaskProps extends Task {
  toggleTaskDone: () => void;
  handleDeleteTask: () => void;
  handleDuplicateTask: () => void;
  handleEditTask: (newDescription: string) => void;
}

const Task: React.FC<TaskProps> = ({
  description,
  done,
  toggleTaskDone,
  handleDeleteTask,
  handleDuplicateTask,
  handleEditTask
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTaskDescription, setEditedTaskDescription] = useState(description);

  const descriptionStyle = useMemo(() =>
    done ? { textDecoration: 'line-through', color: 'var(--grey-300)' } : {}
  , [done]);

  const toggleEditMode = useCallback(() => {
    setEditMode((previousState) => !previousState);
  }, []);

  const handleEditTaskDescription = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEditedTaskDescription(event.target.value);
  }, []);

  const handleEditMode = useCallback(() => {
    if (editMode) {
      handleEditTask(editedTaskDescription);
      setEditedTaskDescription(editedTaskDescription);
    }

    toggleEditMode();
  }, [editMode, editedTaskDescription, handleEditTask, toggleEditMode]);

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          type="checkbox"
          onClick={toggleTaskDone}
        />

        <Check />
      </div>

      {editMode ?
        (<input
          className={styles.editInput}
          value={editedTaskDescription}
          onChange={handleEditTaskDescription}
        />)
        : (<p style={descriptionStyle}>{description}</p>)
      }

      <button
        className={styles.editButton}
        onClick={handleEditMode}
        title={editMode ? 'Salvar' : 'Editar tarefa'}
        >
        {editMode ? <Check fontSize={20} /> : <PencilSimple fontSize={20} /> }
      </button>

      <button
        className={styles.copyButton}
        onClick={handleDuplicateTask}
        title="Duplicar tarefa"
      >
        <Copy fontSize={20} />
      </button>

      <button
        className={styles.deleteButton}
        onClick={handleDeleteTask}
        title="Excluir tarefa"
      >
        <Trash fontSize={20} />
      </button>
    </div>
  );
};

export default Task;
