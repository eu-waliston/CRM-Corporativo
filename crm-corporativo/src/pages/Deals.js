import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  //CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Deals = () => {
const [filters, /*setFilters*/] = useState({
    stage: '',
    search: '',
  });
  const queryClient = useQueryClient();

  const { data: deals, isLoading } = useQuery({
    queryKey: ['deals', filters],
    queryFn: () =>
      api.get('/deals', { params: filters }).then((res) => res.data),
  });

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

  const stages = [
    { id: 'prospecting', name: 'Prospecção', color: 'bg-blue-100 text-blue-800', order: 1 },
    { id: 'qualification', name: 'Qualificação', color: 'bg-yellow-100 text-yellow-800', order: 2 },
    { id: 'proposal', name: 'Proposta', color: 'bg-purple-100 text-purple-800', order: 3 },
    { id: 'negotiation', name: 'Negociação', color: 'bg-orange-100 text-orange-800', order: 4 },
    { id: 'closed_won', name: 'Fechado (Ganho)', color: 'bg-green-100 text-green-800', order: 5 },
    { id: 'closed_lost', name: 'Fechado (Perdido)', color: 'bg-red-100 text-red-800', order: 6 },
  ];

  const handleStageChange = (dealId, newStage) => {
    updateStageMutation.mutate({ id: dealId, stage: newStage });
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

      {/* Pipeline Stages */}
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-4 min-w-max">
          {stages.map((stage) => {
            const stageDeals = deals?.filter(deal => deal.stage === stage.id) || [];
            const totalValue = stageDeals.reduce((sum, deal) => sum + (deal.value || 0), 0);

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {stage.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stageDeals.length} negócios
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${stage.color}`}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(totalValue)}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('dealId', deal.id);
                        e.dataTransfer.setData('currentStage', stage.id);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const draggedDealId = e.dataTransfer.getData('dealId');
                        const fromStage = e.dataTransfer.getData('currentStage');
                        if (fromStage !== stage.id) {
                          handleStageChange(draggedDealId, stage.id);
                        }
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {deal.title}
                        </h4>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(deal.value || 0)}
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span>{deal.contactName}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>
                          Fechamento: {new Date(deal.closeDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex space-x-1">
                          {deal.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => {/* Implementar mais ações */}}
                        >
                          <ArrowRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Deals;