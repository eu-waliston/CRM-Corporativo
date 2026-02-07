import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  PaperAirplaneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  CalendarIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  FilterIcon,
  SearchIcon,
} from '@heroicons/react/24/outline';

import * as Icons from '@heroicons/react/24/outline';

import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../api';

const Communications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: communications, isLoading } = useQuery({
    queryKey: ['communications', activeTab, selectedType],
    queryFn: () => api.get('/communications').then((res) => res.data),
  });

  const tabs = [
    { id: 'all', name: 'Todas', count: 24 },
    { id: 'email', name: 'Email', count: 12 },
    { id: 'sms', name: 'SMS', count: 6 },
    { id: 'calls', name: 'Ligações', count: 4 },
    { id: 'meetings', name: 'Reuniões', count: 2 },
  ];

  const communicationTypes = [
    {
      id: 'email',
      name: 'Email',
      icon: EnvelopeIcon,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: ChatBubbleLeftRightIcon,
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    {
      id: 'call',
      name: 'Ligação',
      icon: PhoneIcon,
      color:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    },
    {
      id: 'meeting',
      name: 'Reunião',
      icon: CalendarIcon,
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    },
  ];

  const statusColors = {
    sent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };

  const mockCommunications = [
    {
      id: 1,
      type: 'email',
      subject: 'Proposta Comercial - Tech Solutions',
      recipient: 'Carlos Santos',
      email: 'carlos@empresa.com',
      content:
        'Encaminhamos proposta comercial conforme discutido na reunião...',
      status: 'sent',
      date: '2024-01-15T10:30:00Z',
      duration: null,
    },
    {
      id: 2,
      type: 'call',
      subject: 'Follow-up Negociação',
      recipient: 'Ana Oliveira',
      email: 'ana@consulting.com',
      content: 'Ligação para alinhar detalhes da proposta',
      status: 'sent',
      date: '2024-01-14T14:20:00Z',
      duration: '15min',
    },
    {
      id: 3,
      type: 'sms',
      subject: 'Confirmação de Reunião',
      recipient: 'Pedro Costa',
      email: 'pedro@techbr.com',
      content: 'Sua reunião está confirmada para amanhã às 10h',
      status: 'sent',
      date: '2024-01-13T09:15:00Z',
      duration: null,
    },
    {
      id: 4,
      type: 'meeting',
      subject: 'Apresentação Produto',
      recipient: 'Mariana Lima',
      email: 'mariana@inovacao.com',
      content: 'Reunião para apresentação completa do produto',
      status: 'scheduled',
      date: '2024-01-16T14:00:00Z',
      duration: '1h',
    },
    {
      id: 5,
      type: 'email',
      subject: 'Contrato para Assinatura',
      recipient: 'Ricardo Almeida',
      email: 'ricardo@global.com',
      content: 'Encaminhamos contrato digital para assinatura',
      status: 'pending',
      date: '2024-01-12T16:45:00Z',
      duration: null,
    },
  ];

  const filteredCommunications = mockCommunications.filter((comm) => {
    const matchesTab = activeTab === 'all' || comm.type === activeTab;
    const matchesType = !selectedType || comm.type === selectedType;
    const matchesSearch =
      !searchTerm ||
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.recipient.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesType && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comunicações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todas as suas comunicações
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            startIcon={<Icons.FilmIcon className="w-4 h-4" />}
          >
            Filtrar
          </Button>
          <Button startIcon={<PlusIcon className="w-4 h-4" />}>
            Nova Comunicação
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.name}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Icons.LightBulbIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por assunto ou cliente..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {communicationTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedType('');
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Communications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommunications.map((comm) => {
          const TypeIcon =
            communicationTypes.find((t) => t.id === comm.type)?.icon ||
            EnvelopeIcon;
          const typeInfo = communicationTypes.find((t) => t.id === comm.type);

          return (
            <div
              key={comm.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${typeInfo?.color}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {comm.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {typeInfo?.name}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[comm.status]}`}
                  >
                    {comm.status === 'sent' && 'Enviado'}
                    {comm.status === 'pending' && 'Pendente'}
                    {comm.status === 'failed' && 'Falhou'}
                    {comm.status === 'scheduled' && 'Agendado'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{comm.recipient}</p>
                      <p className="text-sm">{comm.email}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    {comm.content}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {new Date(comm.date).toLocaleDateString('pt-BR')}
                    </div>
                    {comm.duration && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {comm.duration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                      Visualizar
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium">
                      Responder
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <EnvelopeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Novo Email
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Novo SMS
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <PhoneIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Nova Ligaçao
            </span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
            <CalendarIcon className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">
              Agendar Reunião
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communications;
