'use strict';

const { getSkillsDir } = require('../skills');
const os = require('os');
const path = require('path');

describe('getSkillsDir', () => {
  const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
  const originalEnv = process.env.USERPROFILE;

  afterEach(() => {
    if (originalPlatform) {
      Object.defineProperty(process, 'platform', originalPlatform);
    }
    process.env.USERPROFILE = originalEnv;
  });

  it('retorna caminho Unix em mac/linux', () => {
    Object.defineProperty(process, 'platform', { value: 'darwin', configurable: true });
    const result = getSkillsDir();
    expect(result).toBe(path.join(os.homedir(), '.claude', 'commands'));
  });

  it('retorna caminho Windows usando USERPROFILE', () => {
    Object.defineProperty(process, 'platform', { value: 'win32', configurable: true });
    process.env.USERPROFILE = 'C:\\Users\\TestUser';
    const result = getSkillsDir();
    expect(result).toBe(path.join('C:\\Users\\TestUser', '.claude', 'commands'));
  });

  it('retorna caminho Windows com os.homedir() se USERPROFILE ausente', () => {
    Object.defineProperty(process, 'platform', { value: 'win32', configurable: true });
    delete process.env.USERPROFILE;
    const result = getSkillsDir();
    expect(result).toBe(path.join(os.homedir(), '.claude', 'commands'));
  });
});
