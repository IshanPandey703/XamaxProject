var express = require('express');
const dotenv = require('dotenv');
dotenv.config();
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const Pkmn = require('./models');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type PokemonName{
    _id: String
    english: String
    japanese: String
    french: String
    chinese: String
  }
  type PokemonSpecialStats{
    Attack: Int
    Defense: Int
  }
  type BaseStats{
    HP: Int
    Attack: Int
    Defense: Int
    Sp: PokemonSpecialStats
    Speed: Int
    _id: String
  }
  type Pkmn {
    _id: String
    pokedexId: Int
    name: PokemonName
    type: [String]
    base: BaseStats
  } 
  type Query {
    pokemonById(id: Int!): Pkmn
    allPokemon: [Pkmn]
    pokemonByType(type: String!): [Pkmn]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  pokemonById: async ({ id }) => {
    const pkmn = await Pkmn.findOne({ pokedexId: id });
    return pkmn;
  },
  allPokemon: async () => {
    const pokemons = await Pkmn.find();
    return pokemons;
  },
  pokemonByType: async ({ type }) => {
    const pokemons = await Pkmn.find({ type: { $all: type } });
    return pokemons;
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(process.env.PORT || 4000);
console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT || 4000}/graphql`);
