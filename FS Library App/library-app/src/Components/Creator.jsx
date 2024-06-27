import { useState } from "react";

const Creator = () => {
  const role = JSON.parse(localStorage.getItem("role")) || [];
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      title,
      author,
      price,
    };
    try {
      let res = await fetch(
        "https://librarybackend-uaga.onrender.com/library/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );
      let data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {role.includes("creator") ? (
        <div
          style={{ marginTop: "2%", display: "flex", justifyContent: "center" }}
        >
          <form>
            <input
              type="text"
              placeholder="title"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="author"
              value={author}
              onInput={(e) => setAuthor(e.target.value)}
            />
            <input
              type="number"
              placeholder="price"
              value={price}
              onInput={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      ) : (
        <h3 style={{textAlign:"center"}}>You have access only to view books.</h3>
      )}
    </div>
  );
};

export default Creator;
