import inquirer from 'inquirer';

export class CommandLineService {
  async promptListQuestion({ message, list }) {
    const prompt = await inquirer.prompt([{
      name: 'option',
      type: 'list',
      message,
      choices: list.map(item => item.option)
    }])

    const listIndex = list.findIndex((e) => e.option === prompt.option)
    return list[listIndex]
  }

  async promptSingleQuestion({ message }) {
    const prompt = await inquirer.prompt([{
      name: 'answer',
      message,
    }])

    return prompt.answer
  }

}