const express = require('express');
const {graphqlHTTP } = require('express-graphql');
const {GraphQLSchema , GraphQLObjectType , GraphQLString, GraphQLList} = require('graphql');

const port = process.env.PORT || 5000;

const app = express();

let people = [
    {
        
        name: 'chris',
        desc: 'viking'
    },
    {
        
        name: 'chris2',
        desc: 'viking2'
    },
    {
        
        name: 'chris3',
        desc: 'viking3'
    }
];
let humanType = new GraphQLObjectType({
    name:'Human',
    fields: () =>({
        name:{type:GraphQLString},
        desc:{type:GraphQLString}
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields:{
            hello:{
                type:GraphQLString,
                resolve(){
                    return 'Hello World'
                }
            },
            person:{
                type:humanType,
                resolve(){
                    return people[0];
                }
            },
            people:{
                type:new GraphQLList(humanType),
                resolve(){
                    return people;
                }
            }
        }
    })
});
app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql:true
}));
app.listen(port,() =>{
    console.log(`Server listening at port ${port}`)
});