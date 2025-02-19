import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  isButtonClicked: boolean; // 各Todoアイテムにボタンのクリック状態を追加
}

const Home: React.FC = () => {
  const [todoText, setTodoText] = useState<string>(""); // 入力欄のテキスト
  const [todos, setTodos] = useState<Todo[]>([]); // Todoリストの状態

  // Todoを追加する関数
  const addTodo = () => {
    if (todoText.trim() === "") return; // 空の文字列を追加しない
    const newTodo: Todo = {
      id: Date.now(), // idは一意の値として、現在のタイムスタンプを使用
      text: todoText,
      isButtonClicked: false, // 初期状態ではボタンはクリックされていない
    };
    setTodos([...todos, newTodo]); // 新しいTodoをリストに追加
    setTodoText(""); // 入力欄をクリア
  };

  // Todoを削除する関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // 指定されたid以外のTodoを残す
  };

  // ボタンのクリック状態を更新する関数
  const handleButtonClick = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isButtonClicked: !todo.isButtonClicked } // クリックしたTodoのボタン状態を反転
          : todo
      )
    );
    setTimeout(() => {
      deleteTodo(id); // クリック後0.5秒でTodoを削除
    }, 500);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Press Start 2P', cursive",
        background: "linear-gradient(45deg, #2d3436, #00b894)", // グラデーション背景を追加
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#ecf0f1",
        boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)", // 内側の影で深みを追加
      }}
    >
      {/* スタイリッシュでゲーム風なヘッダー部分 */}
      <h2
        style={{
          color: "#00e5ff", // ネオンシアン色に変更
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "30px",
          textShadow: "2px 2px 15px rgba(0, 0, 0, 0.7)",
        }}
      >
        Todoapp
      </h2>

      {/* Todoを追加するフォーム */}
      <div style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)} // 入力値の更新
          placeholder="新しいTodoを入力"
          style={{
            padding: "15px",
            fontSize: "18px",
            width: "300px", // 横幅を調整
            borderRadius: "12px",
            border: "2px solid rgb(226, 227, 233)", // ボーダーを鮮やかなピンクに変更
            outline: "none",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            marginRight: "20px",
            transition: "all 0.3s ease-in-out",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "15px 40px",
            fontSize: "18px",
            backgroundColor: "#ff007f", // ピンク色に変更
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease-in-out",
            transform: "scale(1.05)", // 少し拡大してアニメーション
          }}
        >
          <span role="img" aria-label="rocket" style={{ marginRight: "8px" }}>
            🚀
          </span>
          Todoを追加
        </button>
      </div>

      {/* Todoリストの表示 */}
      <ul
        style={{
          listStyleType: "none",
          paddingLeft: "0",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "20px",
              backgroundColor: "#1abc9c", // ネオンカラーに変更
              padding: "15px",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "'Press Start 2P', cursive",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
              width: "90%", // 横幅を90%に変更して中央に配置
              maxWidth: "500px", // 最大横幅を設定
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "500" }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleButtonClick(todo.id)}
              style={{
                padding: "8px 15px",
                backgroundColor: "#3498db", // 青色のボタン
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                transform: todo.isButtonClicked ? "scale(1.2)" : "scale(1)", // クリックされたボタンのみ拡大
                boxShadow: todo.isButtonClicked
                  ? "0 0 15px #3498db"
                  : "0 0 8px #3498db", // クリックされたボタンのみ影が変わる
                transition: "all 0.3s ease-in-out",
              }}
            >
              買った！ {/* ボタンの文字を変更 */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
