import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Deals = () => {
  const [filters, setFilters] = useState({
    stage: '',
    search: '',
    sortBy: 'value',
    sortOrder: 'desc',
  });
  const [selectedStage, setSelectedStage] = useState(null);
  const queryClient = useQueryClient();

  const { data: dealsResponse, isLoading } = useQuery({
    queryKey: ['deals', filters],
    queryFn: () =>
      api.get('/deals', { params: filters }).then((res) => res.data),
  });

  // Garante que deals seja um array
  const deals = Array.isArray(dealsResponse) ? dealsResponse : [];

  const updateStageMutation = useMutation({
    mutationFn: ({ id, stage }) => api.patch(`/deals/${id}/stage`, { stage }),
    onSuccess: () => {
      queryClient.invalidateQueries(['deals']);
      toast.success('Estágio atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar estágio.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/deals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['deals']);
      toast.success('Negócio excluído com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir negócio.');
    },
  });

  const stages = [
    { id: 'prospecting', name: 'Prospecção', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', order: 1 },
    { id: 'qualification', name: 'Qualificação', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', order: 2 },
    { id: 'proposal', name: 'Proposta', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', order: 3 },
    { id: 'negotiation', name: 'Negociação', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', order: 4 },
    { id: 'closed_won', name: 'Fechado (Ganho)', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', order: 5 },
    { id: 'closed_lost', name: 'Fechado (Perdido)', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', order: 6 },
  ];

  const handleStageChange = (dealId, newStage) => {
    updateStageMutation.mutate({ id: dealId, stage: newStage });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este negócio?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      setFilters({
        ...filters,
        sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setFilters({
        ...filters,
        sortBy: field,
        sortOrder: 'desc',
      });
    }
  };

  // Ordena os deals
  const sortedDeals = [...deals].sort((a, b) => {
    if (filters.sortBy === 'value') {
      return filters.sortOrder === 'asc'
        ? (a.value || 0) - (b.value || 0)
        : (b.value || 0) - (a.value || 0);
    }
    if (filters.sortBy === 'closeDate') {
      return filters.sortOrder === 'asc'
        ? new Date(a.closeDate) - new Date(b.closeDate)
        : new Date(b.closeDate) - new Date(a.closeDate);
    }
    return 0;
  });

  // Filtra por estágio se selecionado
  const filteredDeals = selectedStage
    ? sortedDeals.filter(deal => deal.stage === selectedStage)
    : sortedDeals;

  // Calcula totais por estágio
  const stageTotals = stages.reduce((acc, stage) => {
    const stageDeals = deals.filter(deal => deal.stage === stage.id);
    acc[stage.id] = {
      count: stageDeals.length,
      value: stageDeals.reduce((sum, deal) => sum + (deal.value || 0), 0),
    };
    return acc;
  }, {});

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
            Negócios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seu pipeline de vendas
          </p>
        </div>
        <Button
          startIcon={<PlusIcon className="w-5 h-5" />}
        >
          Novo Negócio
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por título ou cliente..."
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="input-field"
            value={filters.stage}
            onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
          >
            <option value="">Todos os estágios</option>
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilters({ stage: '', search: '', sortBy: 'value', sortOrder: 'desc' });
                setSelectedStage(null);
              }}
              className="flex-1"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Resumo dos Estágios */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stages.map(stage => (
          <div
            key={stage.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow p-4 cursor-pointer transition-all hover:scale-105 ${
              selectedStage === stage.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedStage(
              selectedStage === stage.id ? null : stage.id
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${stage.color}`}>
                {stage.name}
              </span>
              {selectedStage === stage.id && (
                <ChevronUpIcon className="w-4 h-4 text-gray-500" />
              )}
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stageTotals[stage.id]?.count || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(stageTotals[stage.id]?.value || 0)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Ordenação */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {selectedStage
            ? `Negócios em ${stages.find(s => s.id === selectedStage)?.name}`
            : 'Todos os Negócios'
          } ({filteredDeals.length})
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort('value')}
              className="flex items-center"
            >
              Valor
              {filters.sortBy === 'value' && (
                filters.sortOrder === 'asc'
                  ? <ChevronUpIcon className="w-4 h-4 ml-1" />
                  : <ChevronDownIcon className="w-4 h-4 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort('closeDate')}
              className="flex items-center"
            >
              Data de Fechamento
              {filters.sortBy === 'closeDate' && (
                filters.sortOrder === 'asc'
                  ? <ChevronUpIcon className="w-4 h-4 ml-1" />
                  : <ChevronDownIcon className="w-4 h-4 ml-1" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Grid de Negócios */}
      {filteredDeals.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <CurrencyDollarIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum negócio encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {selectedStage
              ? `Não há negócios no estágio ${stages.find(s => s.id === selectedStage)?.name}`
              : 'Comece criando seu primeiro negócio'
            }
          </p>
          <Button startIcon={<PlusIcon className="w-5 h-5" />}>
            Criar Primeiro Negócio
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const stage = stages.find(s => s.id === deal.stage);

            return (
              <div
                key={deal.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header com estágio */}
                <div className={`px-4 py-3 ${stage.color}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{stage.name}</h3>
                    <div className="text-sm font-bold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(deal.value || 0)}
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {deal.title}
                  </h4>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {deal.contactName} • {deal.company}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        Fechamento: {new Date(deal.closeDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{
                            width: `${parseInt(deal.probability) || 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {deal.probability}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {deal.tags && deal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {deal.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {/* Implementar visualização */}}
                        className="p-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Visualizar"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {/* Implementar edição */}}
                        className="p-1 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Excluir"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Alterar estágio:
                      </span>
                      <select
                        value={deal.stage}
                        onChange={(e) => handleStageChange(deal.id, e.target.value)}
                        className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                      >
                        {stages.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal para Novo Negócio (exemplo) */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full p-4 shadow-lg"
          startIcon={<PlusIcon className="w-6 h-6" />}
        >
          Novo Negócio
        </Button>
      </div>
    </div>
  );
};

export default Deals;