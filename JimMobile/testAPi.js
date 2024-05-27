const email = 'thomas.etc@blabla.com';
const password = 'etc';

fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      mutation {
        login(email: "${email}", password: "${password}") {
          token
          user {
            userId
            name
          }
        }
      }
    `,
  }),
})
.then(response => response.json())
.then(data => console.log('Données reçues de l\'API GraphQL:', data))
.catch(error => console.error('Erreur lors de la tentative de connexion à l\'API GraphQL:', error));