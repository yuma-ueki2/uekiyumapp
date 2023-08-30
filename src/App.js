import logo from './logo.svg';
import './App.css';

//import API, { graphqlOperation } from '@aws-amplify/api';

function App() {
  return (

    <React.Fragment>

<div>データ作成
    <label for="title">タイトル</label>
    <input type="text" id="title" value="foo" />
    <label for="content">内容</label>
    <input type="text" id="content" value="bar" />
  </div>

  <div>Create button
    <button id="create">Create</button>
  </div>
</React.Fragment>


  );
}

export default App;
