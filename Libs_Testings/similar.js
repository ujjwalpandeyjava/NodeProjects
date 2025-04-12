// import OpenAI from 'openai';
const OpenAI = require('openai');
require('dotenv').config()

const apiKey = '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';

const questionInput = "Do you have bulbs?";
generateSimilarQuestions(questionInput);

async function generateSimilarQuestions(input) {
	try {
		const client = new OpenAI({
			key: apiKey,
		});
		const response = await client.chat.completions.create({
			messages: [{ role: 'user', content: `Generate 20 questions similar to: "${input}" with their possible answers.` }],
			model: 'gpt-3.5-turbo',
		});

		const generatedQuestions = response.choices.map((choice, index) => {
			return choice.text.trim();
		});

		// Display the generated questions
		generatedQuestions.forEach((question, index) => {
			console.log(`${index + 1}. ${question}`);
		});
	} catch (error) {
		console.error('Error generating questions:', error);
	}
}