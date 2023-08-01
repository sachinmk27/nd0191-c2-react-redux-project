export function formatQuestion(question, author, authedUser) {
  const total =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  return {
    ...question,
    authorName: author.name,
    authorAvatarURL: author.avatarURL,
    hasAnswered: !!authedUser.answers[question.id],
    hasAnsweredOption: authedUser.answers[question.id],
    noOfResponses: {
      total,
      optionOne: question.optionOne.votes.length,
      optionTwo: question.optionTwo.votes.length,
      optionOnePC: Math.round((question.optionOne.votes.length * 100) / total),
      optionTwoPC: Math.round((question.optionTwo.votes.length * 100) / total),
    },
  };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}
