import { render } from '@testing-library/react';
import { tasks } from 'mocks/data';

import TodoList from '../TodoList';

interface MockedTodoListProps {
  tasks?: Task[] | null;
}

const todoListProps = {
  tasks,
  toggleTaskDone: jest.fn(),
  handleDeleteTask: jest.fn(),
  handleDuplicateTask: jest.fn(),
  handleEditTask: jest.fn()
};

const MockedTodoList: React.FC<MockedTodoListProps> = ({ tasks = null }) => (
  <TodoList {...todoListProps} {...(tasks && { tasks })} />
);

describe('Component TodoList', () => {
  it('should render component', () => {
    const { getByText, getAllByTitle } = render(<MockedTodoList />);

    const createdTasks = getByText('Tarefas criadas');
    expect(createdTasks.nextSibling).toHaveTextContent('2');

    const doneTasks = getByText('Concluídas');
    expect(doneTasks.nextSibling).toHaveTextContent('1 de 2');

    expect(getByText('Tarefa teste 1')).toBeInTheDocument();
    expect(getByText('Tarefa teste 2')).toBeInTheDocument();

    const editButtons = getAllByTitle('Editar tarefa');
    expect(editButtons).toHaveLength(2);

    const duplicateButtons = getAllByTitle('Duplicar tarefa');
    expect(duplicateButtons).toHaveLength(2);

    const deleteButtons = getAllByTitle('Excluir tarefa');
    expect(deleteButtons).toHaveLength(2);
  });

  it('should render component with 0 tasks', () => {
    const { getByText } = render(<MockedTodoList tasks={[]} />);

    const createdTasks = getByText('Tarefas criadas');
    expect(createdTasks.nextSibling).toHaveTextContent('0');

    const doneTasks = getByText('Concluídas');
    expect(doneTasks.nextSibling).toHaveTextContent('0');

    expect(getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument();
    expect(getByText('Crie tarefas e organize seus itens a fazer')).toBeInTheDocument();
  });
});
