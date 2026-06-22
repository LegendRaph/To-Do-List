"use client";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [recyclebin, setRecyclebin] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [rempty, setRempty] = useState(true);
  const [input, setInput] = useState("");
  const [sdropdown, setSdropdown] = useState(false);
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState(false);
  const [comp, setComp] = useState(false);
  const [allitems, setAllItems] = useState(true);
  const [editing, setEditing] = useState(false);

  const [todo, setTodo] = useState([]);

  const date = new Date().toLocaleDateString();

  const woah = () => {
    setTodo((prev) => {
      const newItem = time
        ? [
            {
              text: input,
              id: Date.now(),
              isCompleted: false,
              datemade: date,
            },
            ...prev,
          ]
        : [
            ...prev,
            {
              text: input,
              id: Date.now(),
              isCompleted: false,
              datemade: date,
            },
          ];

      setInput("");
      return newItem;
    });
  };

  const checkEmpty = (prev) => {
    prev.length === 0 ? setEmpty(true) : setEmpty(false);
  };

  const reverse = (arr) => {
    const neworder = [...arr].sort((a, b) => {
      if (a.id < b.id) return time ? -1 : 1;
      if (a.id > b.id) return time ? 1 : -1;
      return 0;
    });

    allitems ? setTodo(neworder) : setRecyclebin(neworder);
  };

  const completed = (arr) => {
    const neworder = [...arr].sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) return comp ? 1 : -1;
      if (!a.isCompleted && b.isCompleted) return comp ? -1 : 1;
      return 0;
    });

    allitems ? setTodo(neworder) : setRecyclebin(neworder);
  };

  return (
    <main className="w-full min-h-screen bg-[#161616] text-white overflow-x-hidden z-10">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-black w-full px-4 py-3 lg:px-6 lg:py-5 fixed">
        <button
          onClick={() => setMenu(!menu)}
          className="hover:scale-110 transition duration-200"
        >
          <img src="/menu.svg" alt="Menu" className="w-7 h-7 lg:w-10 lg:h-10" />
        </button>

        <h1 className="text-xl lg:text-3xl font-bold">To-Do List</h1>

        <button
          onClick={() => setSdropdown(!sdropdown)}
          className="hover:scale-110 transition duration-200"
        >
          <img src="/sort.svg" alt="sort" className="w-7 h-7 lg:w-9 lg:h-9" />
        </button>

        {menu && (
          <div className="fade-in-from-left flex flex-col absolute top-13 left-0 bg-black w-74  min-h-screen">
            <button
              onClick={() => {
                setAllItems(true);
                setMenu(false);
              }}
              className="flex items-center justify-center text-lg lg:text-2xl mt-10 mb-5 hover:bg-[#2e2e2e] w-full h-20"
            >
              All Items
              <span>
                <img
                  src="/to-do-list.svg"
                  alt="Todo"
                  className="w-8 h-8 ml-5"
                />
              </span>
            </button>

            <button
              onClick={() => {
                setAllItems(false);
                setMenu(false);
              }}
              className="flex items-center justify-center text-lg lg:text-2xl hover:bg-[#2e2e2e] w-full h-20"
            >
              Recycle Bin
              <span>
                <img
                  src="/recycle-bin.svg"
                  alt="Recycle"
                  className="w-8 h-8 ml-5"
                />
              </span>
            </button>
          </div>
        )}

        {sdropdown && (
          <div className="fade-in-from-top flex flex-col absolute top-13 lg:top-20 right-0 bg-black w-44 rounded-sm overflow-hidden z-50 shadow-xl">
            <button
              onClick={() => {
                setComp(!comp);
                setSdropdown(false);
                !allitems ? completed(recyclebin) : completed(todo);
              }}
              className="flex items-center justify-center hover:bg-[#2e2e2e] w-full h-16 text-sm"
            >
              Sort by Completion
              <span>
                <img
                  src={`${comp ? "/up-arrow.svg" : "/down-arrow.svg"}`}
                  alt="Arrow"
                  className="w-5 h-5 ml-2"
                />
              </span>
            </button>

            <button
              onClick={() => {
                setSdropdown(false);
                setTime(!time);
                !allitems ? reverse(recyclebin) : reverse(todo);
              }}
              className="flex items-center justify-center hover:bg-[#2e2e2e] w-full h-16 text-sm"
            >
              Sort by Date
              <span>
                <img
                  src={`${time ? "/down-arrow.svg" : "/up-arrow.svg"}`}
                  alt="Arrow"
                  className="w-5 h-5 ml-2"
                />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Todo List */}
      {allitems && (
        <div>
          {empty && (
            <h1 className="text-center mt-85 text-xl lg:text-2xl">
              List is Empty🕸️
            </h1>
          )}

          <div className="flex flex-col w-full mt-13 lg:mt-23 max-w-3xl mx-auto px-3 pb-24">
            {todo.map((todoItem, index) => (
              <div
                key={todoItem.id}
                className="flex items-center bg-[#2e2e2e] p-3 w-full min-h-[100px] mt-5 rounded-2xl"
              >
                <input
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={(e) => {
                    const newChecked = [...todo];
                    newChecked[index].isCompleted = e.target.checked;
                    setTodo(newChecked);
                  }}
                  className="ml-2 mr-3 w-6 h-6"
                />

                <div className="flex flex-col flex-1">
                  {editing ? (
                    <input
                      type="text"
                      value={todoItem.text}
                      onChange={(e) => {
                        const newTodos = [...todo];
                        newTodos[index].text = e.target.value;
                        setTodo(newTodos);
                      }}
                      className="text-lg lg:text-2xl break-words w-full bg-gray-600 text-white rounded px-2 py-1 focus:outline-none"
                    />
                  ) : (
                    <label
                      className={`text-lg lg:text-2xl break-words max-w-[45vw] lg:max-w-[500px] ${
                        todoItem.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {todoItem.text}
                    </label>
                  )}

                  <label className="text-xs text-gray-400 mt-1">
                    {todoItem.datemade}
                  </label>
                </div>

                <div className="flex gap-2 ml-2">
                  <button
                    onClick={() => setEditing(!editing)}
                    className="bg-blue-500 p-3 rounded-xl"
                  >
                    <img src="/edit.svg" alt="Edit" className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => {
                      const newItem = [...todo];
                      newItem.splice(index, 1);

                      setTodo(newItem);
                      setRecyclebin([...recyclebin, todoItem]);

                      setRempty(false);
                      checkEmpty(newItem);
                    }}
                    className="bg-red-500 p-3 rounded-xl"
                  >
                    <img src="/delete.svg" alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <button
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-xl hover:bg-green-700 transition duration-200 shadow-lg"
          >
            <img src="/add.svg" alt="Add" className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Recycle Bin */}
      {!allitems && (
        <div className="flex flex-col mt-13 lg:mt-23 w-full max-w-3xl mx-auto px-3 pb-24">
          {rempty && (
            <h1 className="text-center mt-85 text-xl lg:text-2xl">
              Recycle Bin is Empty🕸️
            </h1>
          )}

          {recyclebin.map((recycleItem, index) => (
            <div
              key={recycleItem.id}
              className="flex items-center bg-[#2e2e2e] p-3 w-full min-h-[100px] mt-5 rounded-2xl"
            >
              <input
                type="checkbox"
                checked={recycleItem.isCompleted}
                onChange={(e) => {
                  const newChecked = [...recyclebin];
                  newChecked[index].isCompleted = e.target.checked;
                  setRecyclebin(newChecked);
                }}
                className="ml-2 mr-3 w-6 h-6"
              />

              <div className="flex flex-col flex-1">
                <label
                  className={`text-lg lg:text-2xl break-words max-w-[45vw] lg:max-w-[500px] ${
                    recycleItem.isCompleted ? "line-through" : ""
                  }`}
                >
                  {recycleItem.text}
                </label>

                <label className="text-xs text-gray-400 mt-1">
                  {recycleItem.datemade}
                </label>
              </div>

              <button
                onClick={() => {
                  const returning = [...recyclebin];
                  returning.splice(index, 1);

                  setRecyclebin(returning);
                  setEmpty(false);

                  recyclebin.length === 1 ? setRempty(true) : setRempty(false);

                  setTodo([
                    ...todo,
                    {
                      text: recycleItem.text,
                      id: Date.now(),
                      isCompleted: recycleItem.isCompleted,
                      datemade: recycleItem.datemade,
                    },
                  ]);
                }}
                className="bg-green-500 p-3 rounded-xl ml-2"
              >
                <img src="/restore.svg" alt="Restore" className="w-5 h-5" />
              </button>
            </div>
          ))}

          {!rempty && (
            <button
              onClick={() => {
                setRecyclebin([]);
                setRempty(true);
              }}
              className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-xl hover:bg-red-700 transition duration-200 shadow-lg"
            >
              <img
                src="/permanent-delete.svg"
                alt="Permanent Delete"
                className="w-5 h-5"
              />
            </button>
          )}
        </div>
      )}

      {/* Add Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-black w-full max-w-md rounded-2xl mb-10 p-5">
            <h1 className="text-xl text-center font-bold">ADD ITEM</h1>

            <input
              type="text"
              maxLength={48}
              minLength={1}
              placeholder="Enter item..."
              className="border-none bg-[#2e2e2e] rounded mt-10 w-full h-11 px-4 text-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  if (input.length === 0) return;

                  woah();
                  setOpen(false);
                  setEmpty(false);
                }}
                className="bg-green-500 text-white flex-1 p-3 rounded-xl hover:bg-green-700 transition duration-200"
              >
                Add
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  setInput("");
                }}
                className="bg-red-500 text-white flex-1 p-3 rounded-xl hover:bg-red-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
