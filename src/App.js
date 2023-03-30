import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'
// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      tag: "",
      tagsList: this.tagsList
      tasksList: [],
      activeTag: "",
    };
  }

  handleTaskChange = (event) => {
    this.setState({ task: event.target.value });
  };

  handleTagChange = (event) => {
    this.setState({ tag: event.target.value });
  };

  handleAddTask = () => {
    const { task, tag, tasksList } = this.state;
    if (task.trim() === "" || tag.trim() === "") {
      alert("Please enter a task and select a tag");
      return;
    }
    const taskItem = { id: uuidv4(), task, tag };
    this.setState({
      task: "",
      tag: "",
      tasksList: [...tasksList, taskItem],
      activeTag: "",
    });
  };

  handleTagClick = (tag) => {
    this.setState({ activeTag: tag });
  };

  render() {
    const { task, tag, tagsList, tasksList, activeTag } = this.state;
    const filteredTasksList =
      activeTag === ""
        ? tasksList
        : tasksList.filter((taskItem) => taskItem.tag === activeTag);

    return (
      <div>
        <h1>Create a task</h1>
        <form>
          <div>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              name="task"
              placeholder="Enter the task here"
              value={task}
              onChange={this.handleTaskChange}
            />
          </div>
          <div>
            <label htmlFor="tag">Tags</label>
            <select id="tag" name="tag" value={tag} onChange={this.handleTagChange}>
              {tagsList.map((tagItem) => (
                <option key={tagItem.optionId} value={tagItem.optionId}>
                  {tagItem.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={this.handleAddTask}>
            Add Task
          </button>
        </form>
        <h1>Tags</h1>
        <ul>
          {tagsList.map((tagItem) => (
            <li key={tagItem.optionId}>
              <button
                type="button"
                className={activeTag === tagItem.optionId ? "active" : ""}
                onClick={() => this.handleTagClick(tagItem.optionId)}
              >
                {tagItem.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1>Tasks</h1>
        {tasksList.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <div>
            <ul>
              {filteredTasksList.map((taskItem) => (
                <li key={taskItem.id}>
                  <p>{taskItem.task}</p>
                  <p>Tag: {taskItem.tag}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default App