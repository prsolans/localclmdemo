var express = require('express');
var SpringCM = require('springcm-node-sdk');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {

    async function quickstart() {
        // Imports the Google Cloud client library
        const language = require('@google-cloud/language');

        // Instantiates a client
        const client = new language.LanguageServiceClient();

        // The text to analyze
        // const text = 'I really like the new design of your website!';
        const text = 'The new design is awful!';

        const document = {
          content: text,
          type: 'PLAIN_TEXT',
        };

        // Detects the sentiment of the text
        const [result] = await client.analyzeSentiment({document: document});
        const sentiment = result.documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    }

    async function analyzeSentimentFromCloud(){
        // Imports the Google Cloud client library
        const language = require('@google-cloud/language');

        // Creates a client
        const client = new language.LanguageServiceClient();

        /**
         * TODO(developer): Uncomment the following lines to run this code
         */
        const bucketName = 'prs-clm1';
        const fileName = 'simple.txt';

        // Prepares a document, representing a text file in Cloud Storage
        const document = {
            gcsContentUri: `gs://${bucketName}/${fileName}`,
            type: 'PLAIN_TEXT',
        };

        // Detects the sentiment of the document
        const [result] = await client.analyzeSentiment({document});

        const sentiment = result.documentSentiment;
        console.log(`Document sentiment:`);
        console.log(`  Score: ${sentiment.score}`);
        console.log(`  Magnitude: ${sentiment.magnitude}`);

        const sentences = result.sentences;
        sentences.forEach(sentence => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`  Score: ${sentence.sentiment.score}`);
        console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
        });
    }

    async function analyzeEntitiesFromCloud(){
        // Imports the Google Cloud client library
        const language = require('@google-cloud/language');

        // Creates a client
        const client = new language.LanguageServiceClient();

        /**
         * TODO(developer): Uncomment the following lines to run this code
         */
        const bucketName = 'prs-clm1';
        const fileName = 'simple.txt';

        // Prepares a document, representing a text file in Cloud Storage
        const document = {
            gcsContentUri: `gs://${bucketName}/${fileName}`,
            type: 'PLAIN_TEXT',
        };

        // Detects entities in the document
        const [result] = await client.analyzeEntities({document});
        const entities = result.entities;

        console.log('Entities:');
        entities.forEach(entity => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
            console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
        }
        });
    }

    async function classifyTextFromCloud() {
        // Imports the Google Cloud client library.
        const language = require('@google-cloud/language');

        // Creates a client.
        const client = new language.LanguageServiceClient();

        /**
         * TODO(developer): Uncomment the following lines to run this code
         */
        const bucketName = 'prs-clm1';
        const fileName = 'simple.txt';

        // Prepares a document, representing a text file in Cloud Storage
        const document = {
            gcsContentUri: `gs://${bucketName}/${fileName}`,
            type: 'PLAIN_TEXT',
        };

        // Classifies text in the document
        const [classification] = await client.classifyText({document});

        console.log('Categories:');
        classification.categories.forEach(category => {
        console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
        });
    }
    //
    //
    //
    //
    //

    // quickstart();
    // analyzeEntitiesFromCloud();
    // analyzeSentimentFromCloud();
    classifyTextFromCloud();
    res.render('home');

});

module.exports = router;
