import inquirer from 'inquirer';
import fs from 'fs/promises';

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project title?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project.',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions.',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information.',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines.',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions.',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project.',
      choices: ['MIT', 'GPLv3', 'Apache', 'Unlicense', 'BSD'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address.',
    },
  ]);

  const markdown = generateMarkdown(answers);

  try {
    await fs.writeFile('README.md', markdown);
    console.log('Successfully created README.md!');
  } catch (error) {
    console.error('Error creating README.md:', error);
  }
}

function generateMarkdown(answers) {
  return `
# ${answers.title}

![License](https://img.shields.io/badge/License-${encodeURIComponent(answers.license)}-blue.svg)

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is covered under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

For more information, feel free to reach out to me on [GitHub](https://github.com/${answers.github}) or via email at ${answers.email}.
`;
}

main();
