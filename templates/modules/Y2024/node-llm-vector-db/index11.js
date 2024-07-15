import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { RunnableSequence } from "@langchain/core/runnables";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CohereEmbeddings } from "@langchain/cohere";

// Define your API keys
const COHERE_API_KEY = "";

// Initialize necessary components
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

// Load PDF documents
const loader1 = new PDFLoader("./javascript_tutorial.pdf");
const loader2 = new PDFLoader("./javascript_tutorial2.pdf");

const docs1 = await loader1.load();
const docs2 = await loader2.load();

// Create vector stores from documents
const vectorStore1 = await HNSWLib.fromDocuments(docs1, embeddings);
const vectorStore2 = await HNSWLib.fromDocuments(docs2, embeddings);

// Create retrievers from vector stores
const retriever1 = vectorStore1.asRetriever();
const retriever2 = vectorStore2.asRetriever();

// Define a chain for comparing the two documents
const compareDocumentsChain = RunnableSequence.from([
  {
    context1: retriever1.pipe(formatDocumentsAsString),
    context2: retriever2.pipe(formatDocumentsAsString),
  },
  // Add any specific logic for comparing the documents here
]);

// Invoke the chain to get the result
const comparisonResult = await compareDocumentsChain.invoke();

// Log the result
console.log("\n\n************************************************************");
console.log("DOCUMENT COMPARISON RESULT =>", comparisonResult);
console.log("************************************************************\n\n");
