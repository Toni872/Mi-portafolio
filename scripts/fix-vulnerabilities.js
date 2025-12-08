#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Fixing security vulnerabilities...\n');

try {
  // Run npm audit fix
  console.log('📋 Running npm audit fix...');
  execSync('npm audit fix --force', { stdio: 'inherit' });
  
  // Check remaining vulnerabilities
  console.log('\n🔍 Checking remaining vulnerabilities...');
  const auditOutput = execSync('npm audit --json', { encoding: 'utf-8', stdio: 'pipe' });
  const audit = JSON.parse(auditOutput);
  
  if (audit.vulnerabilities && Object.keys(audit.vulnerabilities).length > 0) {
    console.log('\n⚠️  Remaining vulnerabilities:');
    console.log(`   Total: ${audit.metadata.vulnerabilities.total}`);
    console.log(`   Critical: ${audit.metadata.vulnerabilities.critical}`);
    console.log(`   High: ${audit.metadata.vulnerabilities.high}`);
    console.log(`   Moderate: ${audit.metadata.vulnerabilities.moderate}`);
    console.log(`   Low: ${audit.metadata.vulnerabilities.low}`);
    
    // Save audit report
    const reportPath = path.join(__dirname, '..', 'audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(audit, null, 2));
    console.log(`\n📄 Full audit report saved to: ${reportPath}`);
    
    if (audit.metadata.vulnerabilities.high > 0 || audit.metadata.vulnerabilities.critical > 0) {
      console.log('\n💡 High/Critical vulnerabilities detected.');
      console.log('   Review audit-report.json for details.');
      console.log('   Some may require manual updates in package.json');
      process.exit(1);
    }
  } else {
    console.log('\n✅ No vulnerabilities found!');
    process.exit(0);
  }
  
} catch (error) {
  console.error('❌ Error fixing vulnerabilities:', error.message);
  process.exit(1);
}







