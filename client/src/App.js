import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getToDos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);
  if (loading) return <h1>Loading......</h1>;
  return (
    <div className="App">
      <table>
        <tbody>
          {data.getToDos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
