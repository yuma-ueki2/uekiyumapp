import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";


// �f�[�^�쐬
const createButton = document.getElementById('create');
createButton.addEventListener('click', () => {
  callMutation(mutations.createTodo, 'create');
});

// �f�[�^�X�V
const updateButton = document.getElementById('update');
updateButton.addEventListener('click', () => {
  callMutation(mutations.updateTodo, 'update');
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


// --------------------------
// Subscriptions
// --------------------------

// Create��Subscribe
const subscribeCreateButton = document.getElementById('subscribe-create');
subscribeCreateButton.addEventListener('click', () => {
  callSubscription(subscriptions.onCreateTodo, 'subscribe(Create)');
});


// Update��Subscribe
const subscribeUpdateButton = document.getElementById('subscribe-update');
subscribeUpdateButton.addEventListener('click', () => {
  callSubscription(subscriptions.onUpdateTodo, 'subscribe(Update)');
});


// Subscription�֐��ȊO�͋���
const callSubscription = (func, funcType) => {
  Amplify.configure(awsconfig);

  console.log(`subscribe(${funcType}): start...`);

  const client = API.graphql(
    {
      query: func,
      authMode: 'API_KEY',
      variables: {
        title: "foo",
        content: "bar"
      }
    }
  ).subscribe({
    next: (data) => {
      console.log(`subscribed: ${funcType}`);
      console.log(data);
    },
    error: (err) => {
      console.log(err);
      console.log(`sub error (${funcType})`);
    },
    close: () => console.log('sub done')
  })
};
