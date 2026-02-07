import React, { useState } from 'react';
import { CameraIcon, PencilIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    phone: '(11) 99999-9999',
    position: 'Gerente de Vendas',
    department: 'Vendas',
    bio: 'Gerente de vendas com 10 anos de experiência em CRM e gestão de equipes.',
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: 'Leads Adquiridos', value: '245' },
    { label: 'Negócios Fechados', value: '89' },
    { label: 'Taxa de Conversão', value: '36.3%' },
    { label: 'Receita Gerada', value: 'R$ 1.2M' },
  ];

  const activities = [
    { action: 'Adicionou novo lead', time: '2 horas atrás' },
    { action: 'Fechou negócio com Empresa X', time: '1 dia atrás' },
    { action: 'Atualizou proposta para Empresa Y', time: '2 dias atrás' },
    { action: 'Realizou treinamento da equipe', time: '1 semana atrás' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Implementar salvamento do perfil
    console.log('Perfil salvo:', profile);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meu Perfil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais
          </p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          startIcon={<PencilIcon className="w-5 h-5" />}
        >
          {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-600 dark:text-primary-300">
                    {profile.name.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow">
                  <CameraIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="input-field text-xl font-bold"
                    />
                    <input
                      type="text"
                      value={profile.position}
                      onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      className="input-field"
                    />
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="input-field"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {profile.name}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                      {profile.position}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      {profile.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Informações de Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cargo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.position}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profile.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Departamento
                </label>
                {isEditing ? (
                  <select
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="input-field"
                  >
                    <option value="Vendas">Vendas</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Suporte">Suporte</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="RH">RH</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">{profile.department}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Activities */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Estatísticas
            </h3>

            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                  <span className="font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Atividades Recentes
            </h3>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 bg-primary-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Habilidades
            </h3>

            <div className="flex flex-wrap gap-2">
              {['Vendas', 'CRM', 'Gestão', 'Negociação', 'Analytics', 'Liderança'].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;