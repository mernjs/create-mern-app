import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { CohereEmbeddings } from "@langchain/cohere";
const COHERE_API_KEY = "";
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });
import { OpenAIEmbeddings } from "@langchain/openai";
const OPENAI_API_KEY=""
const openAIEmbeddings = new OpenAIEmbeddings({openAIApiKey: OPENAI_API_KEY})

const getAns = async () => {
	try {
		const vectorStore = await FaissStore.fromTexts(
			[
				"Question: Where is Clark's based?, \n Answer: Clarks is an American-owned and operated company. Our founder, Paul Clark, fell in love with woodworking. After making some beautiful heirloom cutting boards, he set out to find the very best food safe oil and wax to preserv his pieces. ",
				"Question: Where are Clark's products made?, \n Answer: Our products our proudly made in the USA! Specifically they are made on Bainbridge Island near Seattle, Washington.",
				"Question: Are your products vegan?, \n Answer: At Clark's, all of our oils are suitable for vegans. However, it's important to note that our wax is made from beeswax, which may not be preferred by certain individuals who adhere to a vegan lifestyle."
			],
			[{ id: 1 }, { id: 2 }, { id: 3 }],
			embeddings
		);
		const resultOne = await vectorStore.similaritySearch("Where is Clark's based?", 1);
		console.log("OUTPUT:", resultOne);
	} catch (error) {
		console.log("ERROR:", error)	
	}
};

getAns()