import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Contacts = () => {
  const [filters, setFilters] = useState({
    type: '',
    company: '',
    search: '',
  });
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', filters],
    queryFn: () =>
      api.get('/contacts', { params: filters }).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      toast.success('Contato excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir contato.');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      deleteMutation.mutate(id);
    }
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
            Contatos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os seus contatos
          </p>
        </div>
        <Button
          startIcon={<PlusIcon className="w-5 h-5" />}
        >
          Novo Contato
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="input-field"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
          <select
            className="input-field"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Todos os tipos</option>
            <option value="client">Cliente</option>
            <option value="lead">Lead</option>
            <option value="partner">Parceiro</option>
            <option value="supplier">Fornecedor</option>
          </select>
          <Button
            variant="outline"
            onClick={() =>
              setFilters({ type: '', company: '', search: '' })
            }
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts?.map((contact) => (
          <div
            key={contact.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-300">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {contact.jobTitle}
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {contact.type === 'client' && 'Cliente'}
                {contact.type === 'lead' && 'Lead'}
                {contact.type === 'partner' && 'Parceiro'}
                {contact.type === 'supplier' && 'Fornecedor'}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                <span className="text-sm truncate">{contact.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              {contact.company && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{contact.company}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Criado em {new Date(contact.createdAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* Implementar edição */}}
                  className="p-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  title="Editar"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  title="Excluir"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;