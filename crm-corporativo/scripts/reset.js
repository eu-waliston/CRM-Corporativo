const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Resetando o projeto CRM...');

try {
  // Remove node_modules se existir
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('🗑️  Removendo node_modules...');
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }

  // Remove package-lock.json se existir
  const packageLockPath = path.join(__dirname, '..', 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    console.log('🗑️  Removendo package-lock.json...');
    fs.unlinkSync(packageLockPath);
  }

  // Instala dependências
  console.log('📦 Instalando dependências...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  // Inicia o projeto
  console.log('🚀 Iniciando o projeto...');
  console.log('\n📝 Credenciais para teste:');
  console.log('👑 Admin: admin@crm.com / admin123');
  console.log('👨‍💼 Vendas: vendas@crm.com / vendas123');
  console.log('👤 Teste: teste@crm.com / teste123');
  console.log('\n🔗 Acesse: http://localhost:3000');

  execSync('npm start', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

} catch (error) {
  console.error('❌ Erro ao resetar o projeto:', error.message);
  process.exit(1);
}