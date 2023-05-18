import { ClipboardText } from 'phosphor-react';

import styles from './NoTasks.module.css';

const NoTasks: React.FC = () => {
  return (
    <div className={styles.container}>
      <ClipboardText fontSize={56} color="#333333" />

      <span>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </span>
    </div>
  );
};

export default NoTasks;
