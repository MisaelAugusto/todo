import { render, fireEvent } from '@testing-library/react';

import App from '..';

describe('Component App', () => {
  it('should render component', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText('to')).toBeInTheDocument();
    expect(getByText('do')).toBeInTheDocument();

    expect(getByPlaceholderText('Adicione uma nova tarefa')).toBeInTheDocument();

    const createdTasks = getByText('Tarefas criadas');
    expect(createdTasks.nextSibling).toHaveTextContent('0');

    const doneTasks = getByText('Concluídas');
    expect(doneTasks.nextSibling).toHaveTextContent('0');

    expect(getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument();
    expect(getByText('Crie tarefas e organize seus itens a fazer')).toBeInTheDocument();
  });

  it('should add new task and check it', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<App />);

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    fireEvent.change(taskInput, { target: { value: 'Tarefa teste' } });

    const createButton = getByText('Criar').parentNode;
    if (createButton) fireEvent.click(createButton);

    expect(taskInput).toHaveValue('');

    expect(getByText('Tarefa teste')).toBeInTheDocument();

    const taskCheckbox = getByTestId('task-checkbox');
    fireEvent.click(taskCheckbox);

    expect(getByText('Tarefa teste')).toHaveStyle({
      'text-decoration': 'line-through'
    });

    const createdTasks = getByText('Tarefas criadas');
    expect(createdTasks.nextSibling).toHaveTextContent('1');

    const doneTasks = getByText('Concluídas');
    expect(doneTasks.nextSibling).toHaveTextContent('1 de 1');
  });

  it('should edit a task', () => {
    const {
      getByText,
      getByPlaceholderText,
      getByTitle,
      getByDisplayValue,
      queryByTitle,
      queryByText
    } = render(<App />);

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    fireEvent.change(taskInput, { target: { value: 'Tarefa teste' } });

    const createButton = getByText('Criar').parentNode;
    if (createButton) fireEvent.click(createButton);

    expect(taskInput).toHaveValue('');

    expect(getByText('Tarefa teste')).toBeInTheDocument();

    const editButton = getByTitle('Editar tarefa');
    fireEvent.click(editButton);

    const editTaskInput = getByDisplayValue('Tarefa teste');
    fireEvent.change(editTaskInput, { target: { value: 'Tarefa editada' } });

    const saveButton = getByTitle('Salvar');
    fireEvent.click(saveButton);

    expect(editButton).toBeInTheDocument();
    expect(queryByTitle('Salvar')).not.toBeInTheDocument();

    expect(getByText('Tarefa editada')).toBeInTheDocument();
    expect(queryByText('Tarefa teste')).not.toBeInTheDocument();
  });

  it('should duplicate a task', () => {
    const { getByText, getByPlaceholderText, getByTitle } = render(<App />);

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    fireEvent.change(taskInput, { target: { value: 'Tarefa teste' } });

    const createButton = getByText('Criar').parentNode;
    if (createButton) fireEvent.click(createButton);

    expect(taskInput).toHaveValue('');

    expect(getByText('Tarefa teste')).toBeInTheDocument();

    const duplicateButton = getByTitle('Duplicar tarefa');
    fireEvent.click(duplicateButton);

    expect(getByText('Tarefa teste')).toBeInTheDocument();
    expect(getByText('Tarefa teste - copy')).toBeInTheDocument();
  });

  it('should duplicate a task', () => {
    const { getByText, getByPlaceholderText, getByTitle, queryByText } = render(<App />);

    const taskInput = getByPlaceholderText('Adicione uma nova tarefa');
    fireEvent.change(taskInput, { target: { value: 'Tarefa teste' } });

    const createButton = getByText('Criar').parentNode;
    if (createButton) fireEvent.click(createButton);

    expect(taskInput).toHaveValue('');

    expect(getByText('Tarefa teste')).toBeInTheDocument();

    const deleteButton = getByTitle('Excluir tarefa');
    fireEvent.click(deleteButton);

    expect(queryByText('Tarefa teste')).not.toBeInTheDocument();
  });
});
