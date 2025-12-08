#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for dependency updates...\n');

try {
  // Check outdated packages
  const outdated = execSync('npm outdated --json', { encoding: 'utf-8', stdio: 'pipe' });
  const outdatedPackages = JSON.parse(outdated);
  
  if (Object.keys(outdatedPackages).length === 0) {
    console.log('✅ All dependencies are up to date!');
    process.exit(0);
  }
  
  console.log('⚠️  Found outdated packages:\n');
  
  const updates = [];
  for (const [pkg, info] of Object.entries(outdatedPackages)) {
    console.log(`  ${pkg}:`);
    console.log(`    Current: ${info.current}`);
    console.log(`    Wanted:  ${info.wanted}`);
    console.log(`    Latest:  ${info.latest}`);
    console.log('');
    
    if (info.latest !== info.current) {
      updates.push({
        name: pkg,
        current: info.current,
        latest: info.latest,
        type: info.type || 'dependency',
      });
    }
  }
  
  // Save update report
  const reportPath = path.join(__dirname, '..', 'dependency-updates.json');
  fs.writeFileSync(reportPath, JSON.stringify(updates, null, 2));
  console.log(`📄 Update report saved to: ${reportPath}`);
  
  console.log('\n💡 Run `npm run update-deps` to update dependencies automatically');
  process.exit(1);
  
} catch (error) {
  if (error.status === 1) {
    // npm outdated exits with code 1 when packages are outdated
    console.log('✅ Check completed. Some packages have updates available.');
    process.exit(1);
  } else {
    console.error('❌ Error checking dependencies:', error.message);
    process.exit(1);
  }
}







