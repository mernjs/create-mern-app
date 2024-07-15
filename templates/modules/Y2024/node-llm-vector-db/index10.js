import { ChatOpenAI } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CohereEmbeddings } from "@langchain/cohere";
const COHERE_API_KEY = "";
const OPENAI_API_KEY = ""
const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

const condenseQuestionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

const answerTemplate = `Answer the question based only on the following context:{context} Question: {question}`;

const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

const formatChatHistory = (chatHistory) => {
  const formattedDialogueTurns = chatHistory.map((dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`);
  return formattedDialogueTurns.join("\n");
};

const loader = new PDFLoader("./javascript_tutorial.pdf");
const docs = await loader.load();
const vectorStore = await HNSWLib.fromDocuments(docs, embeddings);

const retriever = vectorStore.asRetriever();


const standaloneQuestionChain = RunnableSequence.from([
  {
    question: (input) => input.question,
    chat_history: (input) =>
      formatChatHistory(input.chat_history),
  },
  CONDENSE_QUESTION_PROMPT,
  model,
  new StringOutputParser(),
]);

const answerChain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocumentsAsString),
    question: new RunnablePassthrough(),
  },
  ANSWER_PROMPT,
  model,
]);

const conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);

const result1 = await conversationalRetrievalQAChain.invoke({
  question: "What is JavaScript?",
  chat_history: [],
});
const contentValue1 = result1.content;
console.log("\n\n************************************************************")
console.log("OUTPUT1=>", contentValue1);
console.log("************************************************************\n\n")

const result2 = await conversationalRetrievalQAChain.invoke({
  question: "advantage and disadvantage ?",
  chat_history: [
    [
      "What is JavaScript?",
    ],
  ],
});
const contentValue2 = result2.content;
console.log("\n\n************************************************************")
console.log("OUTPUT2=>", contentValue2);
console.log("************************************************************\n\n")