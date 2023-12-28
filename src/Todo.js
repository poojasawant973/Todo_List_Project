import React, { useEffect, useState } from "react";

let Todo = () => {
    function getData() {
        const lists = localStorage.getItem("todolist");
        return JSON.parse(lists);
    }

    let [task, setTask] = useState();
    let [items, setItems] = useState(getData());
    let [toggleBtn, setToggleBtn] = useState(false);
    let [editIndex, setEditIndex] = useState();

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items));
    }, [items]);

    function addItem() {
        if (!task) {
            alert("Empty Data");
        } else if (task && toggleBtn) {
            setItems(
                items.map((element) => {
                    if (element.id === editIndex) {
                        return { ...element, taskdata: task };
                    }
                    return element;
                })
            );
            setEditIndex(null);
            setToggleBtn(false);
            setTask(""); // Set task to an empty string after editing
        } else {
            const mynewdata = {
                id: new Date().getTime().toString(),
                taskdata: task,
            };
            setItems([...items, mynewdata]);
            setTask("");
        }
    }

    function deleteItem(id) {
        const updatedList = items.filter((element) => {
            return element.id !== id;
        });
        setItems(updatedList);
    }

    function editItem(id) {
        const edited_item = items.find((element) => {
            return element.id === id;
        });
        setTask(edited_item.taskdata);
        setEditIndex(id);
        setToggleBtn(true);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <h2>To-Do List</h2>
                        <br /><br />
                        <input className="form-control" placeholder="Add a new task" value={task} id="task" onChange={(e) => setTask(e.target.value)} style={{ width: '300px', padding: '10px' }} />
                        <i className={toggleBtn ? "bi bi-pencil" : "bi bi-plus-lg"} id="add-icon" onClick={addItem}></i>
                        <button className="btn btn-primary" onClick={addItem}>Add</button>
                        <ul id="task-list">
                            {
                                items.map((element) => {
                                    return (
                                        <li key={element.id}> {element.taskdata} <i className="bi bi-pen-fill" id="edit-btn" onClick={() => editItem(element.id)}></i> <i className="bi bi-trash-fill" id="delete-btn" onClick={() => deleteItem(element.id)}></i> </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
