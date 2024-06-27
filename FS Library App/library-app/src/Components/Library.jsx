import { useEffect, useState } from "react";

const Library = () => {
  const role = JSON.parse(localStorage.getItem("role")) || [];
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        "https://librarybackend-uaga.onrender.com/library/books",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (value) => {
    if (value == "old") {
      try {
        let res = await fetch(
          `https://librarybackend-uaga.onrender.com/library/view?${value}=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        let data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    } else if (value == "new") {
      try {
        let res = await fetch(
          `https://librarybackend-uaga.onrender.com/library/view?${value}=1`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        let data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await fetch(
        `https://librarybackend-uaga.onrender.com/library/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        marginTop: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Library</h1>
      <select
        style={{ marginBottom: "1%" }}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        <option value="">Sort By</option>
        <option value="old">Older than 10 mins</option>
        <option value="new">Newly added books</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : books.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Delete Book</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((e, i) => (
              <tr key={i}>
                <td>{e.title}</td>
                <td>{e.author}</td>
                <td>{e.price}</td>
                <td>
                  <button
                    style={{ width: "100%" }}
                    disabled={!role.includes("creator")}
                    onClick={() => handleDelete(e._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No Books created by you or no newer books added.</h3>
      )}
    </div>
  );
};

export default Library;
