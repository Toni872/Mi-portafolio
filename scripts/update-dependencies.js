#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Updating dependencies...\n');

try {
  // Read package.json
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  
  // Backup package.json
  const backupPath = packageJsonPath + '.backup';
  fs.writeFileSync(backupPath, JSON.stringify(packageJson, null, 2));
  console.log(`📦 Backup created: ${backupPath}\n`);
  
  // Update dependencies
  console.log('📥 Updating dependencies...');
  execSync('npm update', { stdio: 'inherit' });
  
  // Check for major updates
  console.log('\n🔍 Checking for major version updates...');
  try {
    const outdated = execSync('npm outdated --json', { encoding: 'utf-8', stdio: 'pipe' });
    const outdatedPackages = JSON.parse(outdated);
    
    const majorUpdates = [];
    for (const [pkg, info] of Object.entries(outdatedPackages)) {
      const currentMajor = parseInt(info.current.split('.')[0]);
      const latestMajor = parseInt(info.latest.split('.')[0]);
      
      if (latestMajor > currentMajor) {
        majorUpdates.push({
          name: pkg,
          current: info.current,
          latest: info.latest,
        });
      }
    }
    
    if (majorUpdates.length > 0) {
      console.log('\n⚠️  Major version updates available (manual review recommended):');
      majorUpdates.forEach(update => {
        console.log(`  ${update.name}: ${update.current} → ${update.latest}`);
      });
    }
  } catch (e) {
    // npm outdated exits with 1 when packages are outdated, which is expected
  }
  
  // Run tests after update
  console.log('\n🧪 Running tests after update...');
  try {
    execSync('npm test -- --passWithNoTests', { stdio: 'inherit' });
    console.log('\n✅ Tests passed!');
  } catch (error) {
    console.error('\n❌ Tests failed after update. Restoring backup...');
    fs.copyFileSync(backupPath, packageJsonPath);
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Backup restored');
    process.exit(1);
  }
  
  // Run build check
  console.log('\n🏗️  Checking build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('\n✅ Build successful!');
  } catch (error) {
    console.error('\n❌ Build failed after update. Restoring backup...');
    fs.copyFileSync(backupPath, packageJsonPath);
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Backup restored');
    process.exit(1);
  }
  
  console.log('\n✅ Dependencies updated successfully!');
  console.log('💡 Review changes and commit if everything looks good.');
  
} catch (error) {
  console.error('❌ Error updating dependencies:', error.message);
  process.exit(1);
}

