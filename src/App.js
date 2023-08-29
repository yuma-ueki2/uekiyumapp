import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from "./graphql/mutations";




// �f�[�^�쐬
const createButton = document.getElementById('create');
createButton.addEventListener('click', () => {
  callMutation(mutations.createTodo, 'create');
});



// Mutation�֐��ȊO�͂��ׂċ���
const callMutation = (func, funcType) => {
  Amplify.configure(awsconfig);
  API.graphql(
    {
      query: func,
      authMode: 'API_KEY',
      variables: {
        input: {
          title: document.getElementById('title').value,
          content: document.getElementById('content').value,
        }
      }
    }
  ).then((data) => {
    console.log(`${funcType}: target data.`);
    console.log(data);
  })
    .catch((e) => {
      console.log(`mutation(${funcType}) error`);
      console.log(e)
    });
};




