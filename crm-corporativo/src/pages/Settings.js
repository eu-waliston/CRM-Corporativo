import React, { useState } from 'react';
// import { SaveIcon, BellIcon, UserIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import * as Icons from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Perfil
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-9999',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',

    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    dealUpdates: true,

    // Segurança
    twoFactorAuth: false,
    sessionTimeout: 30,

    // Empresa
    companyName: 'Minha Empresa Ltda',
    companyEmail: 'contato@empresa.com',
    companyPhone: '(11) 3333-3333',
    companyAddress: 'Av. Paulista, 1000 - São Paulo, SP',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Implementar salvamento das configurações
    console.log('Configurações salvas:', settings);
    alert('Configurações salvas com sucesso!');
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: Icons.UserIcon },
    { id: 'notifications', name: 'Notificações', icon: Icons.BellIcon },
    { id: 'security', name: 'Segurança', icon: Icons.ShieldCheckIcon },
    { id: 'company', name: 'Empresa', icon: Icons.GlobeAltIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Configurações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie as configurações da sua conta e empresa
          </p>
        </div>
        <Button
          onClick={handleSave}
          startIcon={<Icons.ArchiveBoxIcon className="w-5 h-5" />}
        >
          Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <nav className="space-y-1 p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Perfil Pessoal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Idioma
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleInputChange('profile', 'language', e.target.value)}
                      className="input-field"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fuso Horário
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
                      className="input-field"
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="Europe/London">London (GMT+0)</option>
                      <option value="Europe/Berlin">Berlin (GMT+1)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notificações
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      id: 'emailNotifications',
                      label: 'Notificações por Email',
                      description: 'Receba notificações importantes por email',
                      value: settings.emailNotifications,
                    },
                    {
                      id: 'pushNotifications',
                      label: 'Notificações Push',
                      description: 'Receba notificações no navegador',
                      value: settings.pushNotifications,
                    },
                    {
                      id: 'weeklyReports',
                      label: 'Relatórios Semanais',
                      description: 'Receba relatórios semanais de desempenho',
                      value: settings.weeklyReports,
                    },
                    {
                      id: 'dealUpdates',
                      label: 'Atualizações de Negócios',
                      description: 'Notificações sobre mudanças no pipeline',
                      value: settings.dealUpdates,
                    },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {setting.label}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {setting.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.value}
                          onChange={(e) => handleInputChange('notifications', setting.id, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Segurança
                </h2>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Autenticação de Dois Fatores (2FA)
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    {settings.twoFactorAuth && (
                      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Configure a autenticação de dois fatores usando um app como Google Authenticator ou Authy.
                        </p>
                        <Button variant="outline" size="sm">
                          Configurar 2FA
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tempo de Sessão (minutos)
                    </label>
                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                      className="input-field"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                      <option value={0}>Nunca expirar</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Tempo de inatividade antes do logout automático
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Sessões Ativas
                    </h3>
                    <div className="space-y-3">
                      {[
                        { device: 'Chrome - Windows', location: 'São Paulo, BR', lastActive: 'Agora', current: true },
                        { device: 'Safari - iPhone', location: 'Rio de Janeiro, BR', lastActive: '2 horas atrás', current: false },
                        { device: 'Firefox - Linux', location: 'Curitiba, BR', lastActive: '1 dia atrás', current: false },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {session.device}
                              {session.current && (
                                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                                  Atual
                                </span>
                              )}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span>{session.location}</span>
                              <span className="mx-2">•</span>
                              <span>Última atividade: {session.lastActive}</span>
                            </div>
                          </div>
                          {!session.current && (
                            <Button variant="outline" size="sm">
                              Encerrar
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Informações da Empresa
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleInputChange('company', 'companyName', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email da Empresa
                    </label>
                    <input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleInputChange('company', 'companyEmail', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefone da Empresa
                    </label>
                    <input
                      type="tel"
                      value={settings.companyPhone}
                      onChange={(e) => handleInputChange('company', 'companyPhone', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Endereço
                    </label>
                    <textarea
                      value={settings.companyAddress}
                      onChange={(e) => handleInputChange('company', 'companyAddress', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Configurações do Sistema
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Moeda Padrão
                      </label>
                      <select className="input-field" defaultValue="BRL">
                        <option value="BRL">Real Brasileiro (R$)</option>
                        <option value="USD">Dólar Americano ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Formato de Data
                      </label>
                      <select className="input-field" defaultValue="dd/MM/yyyy">
                        <option value="dd/MM/yyyy">DD/MM/AAAA</option>
                        <option value="MM/dd/yyyy">MM/DD/AAAA</option>
                        <option value="yyyy-MM-dd">AAAA-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;