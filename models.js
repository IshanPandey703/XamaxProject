const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL)


const Schema = mongoose.Schema;

const pkmnSchema = new Schema({
  pokedexId: {
    type: Number,
    required: true,
  },
  name: {
    type: {
      english: {
        type: String,
        required: true,
      },
      japanese: {
        type: String,
        required: true,
      },
      chinese: {
        type: String,
        required: true,
      },
      french: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  base: {
    type: {
      HP: {
        type: Number,
        required: true,
      },
      Attack: {
        type: Number,
        required: true,
      },
      Defense: {
        type: Number,
        required: true,
      },
      Sp: {
        type: {
          Attack: {
            type: Number,
            required: true,
          },
          Defense: {
            type: Number,
            required: true,
          },
        },
        required: true,
      },
      Speed: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
}, { versionKey: false });


const Pokemon = mongoose.model('Pokemon', pkmnSchema);

module.exports = Pokemon
