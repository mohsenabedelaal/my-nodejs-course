import * as api from "../api/index";
export const readTodos = async () => {
  try {
    const { data } = await api.readTodos();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodos = async (todo) => {
  try {
    const { data } = await api.createTodos(todo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const { data } = await api.updateTodo(id, updatedTodo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const { data } = await api.deleteTodo(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};
