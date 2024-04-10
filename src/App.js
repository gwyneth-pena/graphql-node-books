import '../src/App.css';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {
  return (
    <div className='main'>
      <h1>Reading List</h1>
      <BookList/>
      <AddBook/>
    </div>
  );
}

export default App;
