import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const leadSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
  company: yup.string().required('Empresa é obrigatória'),
  jobTitle: yup.string(),
  source: yup.string().required('Fonte é obrigatória'),
  status: yup.string().required('Status é obrigatório'),
  value: yup.number().typeError('Valor deve ser um número').positive('Valor deve ser positivo').nullable(),
  notes: yup.string(),
});

const LeadForm = ({ lead, onSuccess, onCancel }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues: lead || {
      name: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      source: 'website',
      status: 'new',
      value: '',
      notes: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/leads', data),
    onSuccess: () => {
      toast.success('Lead criado com sucesso!');
      queryClient.invalidateQueries(['leads']);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro ao criar lead');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => api.put(`/leads/${lead.id}`, data),
    onSuccess: () => {
      toast.success('Lead atualizado com sucesso!');
      queryClient.invalidateQueries(['leads']);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar lead');
    },
  });

  const onSubmit = (data) => {
    if (lead) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome *
          </label>
          <input
            type="text"
            {...register('name')}
            className="input-field"
            placeholder="Digite o nome completo"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register('email')}
            className="input-field"
            placeholder="email@exemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="input-field"
            placeholder="(11) 99999-9999"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Empresa *
          </label>
          <input
            type="text"
            {...register('company')}
            className="input-field"
            placeholder="Nome da empresa"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        {/* Cargo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cargo
          </label>
          <input
            type="text"
            {...register('jobTitle')}
            className="input-field"
            placeholder="Ex: Gerente de Vendas"
          />
        </div>

        {/* Fonte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fonte *
          </label>
          <select
            {...register('source')}
            className="input-field"
          >
            <option value="website">Website</option>
            <option value="social">Redes Sociais</option>
            <option value="referral">Indicação</option>
            <option value="event">Evento</option>
            <option value="email">Email Marketing</option>
            <option value="other">Outro</option>
          </select>
          {errors.source && (
            <p className="mt-1 text-sm text-red-600">{errors.source.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status *
          </label>
          <select
            {...register('status')}
            className="input-field"
          >
            <option value="new">Novo</option>
            <option value="contacted">Contactado</option>
            <option value="qualified">Qualificado</option>
            <option value="proposal">Proposta Enviada</option>
            <option value="negotiation">Negociação</option>
            <option value="won">Ganho</option>
            <option value="lost">Perdido</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Valor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Valor (R$)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('value')}
            className="input-field"
            placeholder="0.00"
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
          )}
        </div>
      </div>

      {/* Observações */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Observações
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="input-field"
          placeholder="Adicione observações importantes sobre este lead..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {lead ? 'Atualizando...' : 'Criando...'}
            </>
          ) : (
            lead ? 'Atualizar Lead' : 'Criar Lead'
          )}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;