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

  const entries = await fs.readdir(skillsSrc, { withFileTypes: true });
  const installed = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillFile = path.join(skillsSrc, entry.name, 'SKILL.md');
    if (!await fs.pathExists(skillFile)) continue;
    const destDir = path.join(dest, entry.name);
    await fs.ensureDir(destDir);
    await fs.copy(skillFile, path.join(destDir, 'SKILL.md'), { overwrite: true });
    installed.push(entry.name);
  }

  return { dest, installed };
}

module.exports = { installSkills, getSkillsDir };
