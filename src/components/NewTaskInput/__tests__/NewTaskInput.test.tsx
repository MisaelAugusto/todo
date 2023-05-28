import { render, fireEvent } from '@testing-library/react';

import NewTaskInput from '../NewTaskInput';

const handleAddNewTask = jest.fn();
const MockedNewTaskInput = () => <NewTaskInput handleAddNewTask={handleAddNewTask} />;

describe('Component NewTaskInput', () => {
  it('should render component', () => {
    const { getByText, getByPlaceholderText } = render(<MockedNewTaskInput />);

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    expect(taskInput).toBeInTheDocument();

    const createButton = getByText('Criar');
    expect(createButton).toBeInTheDocument();
  });

  it('should enable create button when user types task description', () => {
    const { getByText, getByPlaceholderText } = render(<MockedNewTaskInput />);

    const createButton = getByText('Criar').parentNode;
    expect(createButton).toBeDisabled();

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    fireEvent.change(taskInput, { target: { value: 'Tarefa teste' } });

    expect(createButton).toBeEnabled();

    if (createButton) fireEvent.click(createButton);

    expect(handleAddNewTask).toHaveBeenCalledTimes(1);
  });
});
