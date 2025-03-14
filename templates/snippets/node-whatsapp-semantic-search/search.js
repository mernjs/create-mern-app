// search.js
const client = require('./elasticsearch');
require('dotenv').config();

async function getQueryEmbedding(query) {
    try {
        const response = await client.ml.inferTrainedModel({
            model_id: '.elser_model_2',
            body: {
                docs: [{ text_field: query }], 
            },
        });
        const embedding = response.inference_results[0].predicted_value
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

async function semanticSearch(query, k = 5) {
  try {
    const embedding = await getQueryEmbedding(query);

    const response = await client.search({
      index: process.env.INDEX_NAME,
      size: k,
      body: {
        query: {
          script_score: {
            query: { match_all: {} },
            script: {
              source: "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
              params: { query_vector: embedding }
            }
          }
        },
        _source: {
          includes: ["sender", "receiver", "timestamp", "message", "topics"]
        }
      }
    });

    console.log("FULL RESPONSE ==>>", response)

    const hits = response.hits.hits;

    const results = hits.map(hit => ({
      sender: hit._source.sender,
      receiver: hit._source.receiver,
      timestamp: hit._source.timestamp,
      message: hit._source.message,
      topics: hit._source.topics,
      score: hit._score
    }));

    return results;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    throw error;
  }
}

module.exports = { semanticSearch };
