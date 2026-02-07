import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import LeadForm from '../components/leads/LeadForm';

const Leads = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    search: '',
  });
  const queryClient = useQueryClient();

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', filters],
    queryFn: () =>
      api.get('/leads', { params: filters }).then((res) => res.data),
  });
   console.log(leads);

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      toast.success('Lead excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir lead.');
    },
  });

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmitSuccess = () => {
    setShowForm(false);
    setSelectedLead(null);
    queryClient.invalidateQueries(['leads']);
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };

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
            Gerenciamento de Leads
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os seus leads em um só lugar
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          startIcon={<PlusIcon className="w-5 h-5" />}
        >
          Novo Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Todos os status</option>
            <option value="new">Novo</option>
            <option value="contacted">Contactado</option>
            <option value="qualified">Qualificado</option>
            <option value="lost">Perdido</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            value={filters.source}
            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
          >
            <option value="">Todas as fontes</option>
            <option value="website">Website</option>
            <option value="social">Redes Sociais</option>
            <option value="referral">Indicação</option>
            <option value="event">Evento</option>
          </select>
          <Button
            variant="outline"
            onClick={() =>
              setFilters({ status: '', source: '', search: '' })
            }
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leads?.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-300">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {lead.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status === 'new' && 'Novo'}
                      {lead.status === 'contacted' && 'Contactado'}
                      {lead.status === 'qualified' && 'Qualificado'}
                      {lead.status === 'lost' && 'Perdido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {lead.value
                      ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(lead.value)
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Excluir"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {/* Implementar visualização */}}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Visualizar"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedLead ? 'Editar Lead' : 'Novo Lead'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedLead(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <LeadForm
                lead={selectedLead}
                onSuccess={handleSubmitSuccess}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedLead(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;