import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

describe('_saveQuestion', () => {
  test('should return a new question', async () => {
    const question = {
      optionOneText: 'one',
      optionTwoText: 'two',
      author: 'harrypotter',
    };
    const newQuestion = await _saveQuestion(question);
    expect(newQuestion.author).toBe(question.author);
    expect(newQuestion.optionOne.text).toBe(question.optionOneText);
    expect(newQuestion.optionTwo.text).toBe(question.optionTwoText);
  });

  test('should return an error', async () => {
    expect.assertions(1);
    const question = {
      optionOneText: '',
      optionTwoText: 'two',
      author: 'harrypotter',
    };
    try {
      await _saveQuestion(question);
    } catch (e) {
      expect(e).toBe('Please provide optionOneText, optionTwoText, and author');
    }
  });
});

describe('_saveQuestionAnswer', () => {
  test('should save answer', async () => {
    const questions = await _getQuestions();
    const users = await _getUsers();
    const info = {
      authedUser: Object.keys(users)[0],
      qid: Object.keys(questions)[0],
      answer: 'optionOne',
    };
    await _saveQuestionAnswer(info);
    const updatedQuestions = await _getQuestions();
    const updatedUsers = await _getUsers();
    expect(updatedQuestions[info.qid][info.answer].votes).toContain(
      info.authedUser
    );
    expect(updatedUsers[info.authedUser].answers[info.qid]).toBeDefined();
    expect(updatedUsers[info.authedUser].answers[info.qid]).toBe(info.answer);
  }, 5000);

  test('should return an error', async () => {
    const info = {
      authedUser: '',
      qid: '',
      answer: 'optionOne',
    };
    expect.assertions(1);
    try {
      await _saveQuestionAnswer(info);
    } catch (e) {
      expect(e).toBe('Please provide authedUser, qid, and answer');
    }
  });
});
