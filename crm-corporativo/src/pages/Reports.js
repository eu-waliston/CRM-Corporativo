import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// import { Icons.DownloadIcon, FilterIcon, CalendarIcon } from '@heroicons/react/24/outline';
import * as Icons from '@heroicons/react/24/outline';

import Button from '../components/common/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });

  const revenueData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Receita',
        data: [65000, 79000, 82000, 91000, 105000, 120000, 98000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Meta',
        data: [60000, 70000, 80000, 90000, 100000, 110000, 120000],
        borderColor: 'rgb(59, 130, 246)',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const conversionData = {
    labels: ['Website', 'Redes Sociais', 'Email', 'Indicação', 'Eventos'],
    datasets: [
      {
        label: 'Taxa de Conversão (%)',
        data: [3.2, 2.1, 4.5, 6.8, 5.2],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const performanceData = {
    labels: ['João S.', 'Maria A.', 'Pedro C.', 'Ana L.', 'Carlos M.'],
    datasets: [
      {
        label: 'Vendas (R$)',
        data: [125000, 98000, 156000, 112000, 89000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Meta (R$)',
        data: [120000, 100000, 150000, 110000, 90000],
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
      },
    ],
  };

  const topProductsData = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const kpis = [
    { label: 'Receita Total', value: 'R$ 628.5k', change: '+12.5%', positive: true },
    { label: 'Novos Clientes', value: '245', change: '+8.2%', positive: true },
    { label: 'CAC', value: 'R$ 450', change: '-3.1%', positive: true },
    { label: 'LTV', value: 'R$ 2.8k', change: '+5.7%', positive: true },
    { label: 'Churn Rate', value: '2.4%', change: '-0.8%', positive: true },
    { label: 'Satisfação', value: '4.7/5.0', change: '+0.3', positive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Relatórios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Análises e métricas do seu negócio
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Icons.CalendarIcon className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="input-field py-1"
            />
            <span>até</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="input-field py-1"
            />
          </div>
          <Button
            variant="outline"
            startIcon={<Icons.FilmIcon className="w-5 h-5" />}
          >
            Filtrar
          </Button>
          <Button
            startIcon={<Icons.CakeIcon className="w-5 h-5" />}
          >
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {kpi.label}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {kpi.value}
            </p>
            <p className={`text-sm font-medium mt-1 ${
              kpi.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Receita vs Meta
          </h3>
          <Line data={revenueData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: function(value) {
                    return 'R$ ' + (value / 1000) + 'k';
                  }
                }
              }
            }
          }} />
        </div>

        {/* Conversion Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Conversão por Canal
          </h3>
          <Bar data={conversionData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return value + '%';
                  }
                }
              }
            }
          }} />
        </div>

        {/* Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Desempenho da Equipe
          </h3>
          <Bar data={performanceData} options={{
            responsive: true,
            scales: {
              x: {
                stacked: false,
              },
              y: {
                stacked: false,
                ticks: {
                  callback: function(value) {
                    return 'R$ ' + (value / 1000) + 'k';
                  }
                }
              }
            }
          }} />
        </div>

        {/* Top Products Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Produtos Mais Vendidos
          </h3>
          <Pie data={topProductsData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
            },
          }} />
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Novo lead cadastrado', user: 'João Silva', time: '10 min atrás', type: 'lead' },
              { action: 'Negócio fechado', user: 'Maria Santos', time: '1 hora atrás', type: 'deal' },
              { action: 'Proposta enviada', user: 'Pedro Costa', time: '3 horas atrás', type: 'proposal' },
              { action: 'Reunião agendada', user: 'Ana Oliveira', time: '5 horas atrás', type: 'meeting' },
              { action: 'Contato atualizado', user: 'Carlos Mendes', time: '1 dia atrás', type: 'contact' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'lead' ? 'bg-blue-500' :
                  activity.type === 'deal' ? 'bg-green-500' :
                  activity.type === 'proposal' ? 'bg-purple-500' :
                  activity.type === 'meeting' ? 'bg-orange-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      por {activity.user}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Opportunities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Maiores Oportunidades
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Empresa X', value: 75000, stage: 'Negociação', probability: '75%' },
              { name: 'Empresa Y', value: 52000, stage: 'Proposta', probability: '60%' },
              { name: 'Empresa Z', value: 125000, stage: 'Qualificação', probability: '40%' },
              { name: 'Empresa A', value: 38000, stage: 'Negociação', probability: '80%' },
              { name: 'Empresa B', value: 95000, stage: 'Fechamento', probability: '90%' },
            ].map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {opportunity.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {opportunity.stage}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(opportunity.value)}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {opportunity.probability}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;