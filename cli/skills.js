'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

function getSkillsDir() {
  if (process.platform === 'win32') {
    return path.join(process.env.USERPROFILE || os.homedir(), '.claude', 'commands');
  }
  return path.join(os.homedir(), '.claude', 'commands');
}

async function installSkills(skillsSrc) {
  const dest = getSkillsDir();
  await fs.ensureDir(dest);

  const files = await fs.readdir(skillsSrc);
  const installed = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    await fs.copy(path.join(skillsSrc, file), path.join(dest, file), { overwrite: true });
    installed.push(file.replace('.md', ''));
  }

  return { dest, installed };
}

module.exports = { installSkills, getSkillsDir };
