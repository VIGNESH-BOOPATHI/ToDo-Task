import { useState } from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('not completed');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const addOrUpdateTodo = () => {
    if (editMode) {
      const updatedTodos = todos.map(todo => {
        if (todo.id === editId) {
          return {
            ...todo,
            taskName,
            description,
            status
          };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditMode(false);
      setEditId(null);
    } else {
      if (taskName.trim() !== '') {
        const newTodo = {
          id: Date.now(),
          taskName,
          description,
          status
        };
        setTodos([...todos, newTodo]);
      }
    }
    setTaskName('');
    setDescription('');
    setStatus('not completed');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (todo) => {
    setTaskName(todo.taskName);
    setDescription(todo.description);
    setStatus(todo.status);
    setEditMode(true);
    setEditId(todo.id);
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'all') {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <div className="container" >
      <h1 className="mb-4">Todo App</h1>

      {/* Form for adding/editing todos */}
      <div className="row">
        <div className="col-md-4">
          <input type="text"  className="form-control mb-2" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Enter Task Name" />
        </div>
        <div className="col-md-4">
          <input type="text"  className="form-control mb-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" />
        </div>
        <div className="col-md-4" >
          <select className="form-select mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not completed">Not Completed</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn btn-primary" onClick={addOrUpdateTodo}>{editMode ? 'Update Todo' : 'Add Todo'}</button>
        </div>
      </div>

      <hr></hr>

      <h1 className="mb-4">Todo Tasks</h1>
      {/* Filter for status */}
      <div className="mb-3">
        <label>Filter By Status:</label>
        <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Separate section for displaying todos */}
     
      <div className='container'>
  <div className='row card-container'>
    {filteredTodos.map(todo => (
      <div key={todo.id} className={`col-md-6 ${filteredTodos.length <= 2 ? 'col-lg-6' : 'col-lg-4'} mb-3`}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Name: {todo.taskName}</h5>
            <p className="card-text">Description: {todo.description}</p>
            <div className="mb-2">
              <label>Status:</label>
              <select className="form-select" value={todo.status} onChange={(e) => updateStatus(todo.id, e.target.value)}>
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <button className="btn btn-danger me-2" onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button className="btn btn-warning" onClick={() => editTodo(todo)}>Edit</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default App;
