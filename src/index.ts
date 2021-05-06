import { gql, ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({})
const client = new ApolloClient({
  cache
})

// UNCOMMENT THIS TO HAVE THE MUTATION FIELD RUN
// client.addResolvers({
//   Mutation: {
//     foo: (...args) => console.log('resolver mut', ...args) || 1
//   }
// })

cache.policies.addTypePolicies({
  Mutation: {
    fields: {
      foo: {
        read: (...args) => console.log('read mut', ...args) || 1,
        merge: (...args) => console.log('merge mut', ...args) || 1
      }
    }
  }
})

client.mutate({ mutation: gql` mutation { foo @client } ` })
// no logs if you comment the addResolvers
// but if the resolvers are set, the mutation typePolicies are correctly called "merge mut undefined 2 Object{}"
