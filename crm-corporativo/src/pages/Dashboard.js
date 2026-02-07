import React from 'react';
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

import * as Icons from '@heroicons/react/24/outline';
// import api from '../api';

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

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Leads',
      value: '1,254',
      change: '+12.5%',
      icon: Icons.UserGroupIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Faturamento',
      value: 'R$ 245.8k',
      change: '+8.2%',
      icon: Icons.CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Taxa de Conversão',
      value: '24.3%',
      change: '+3.1%',
      icon: Icons.ArrowTrendingUpIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Negócios Fechados',
      value: '89',
      change: '+5.7%',
      icon: Icons.CheckCircleIcon,
      color: 'bg-orange-500',
    },
  ];

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Leads',
        data: [65, 78, 66, 84, 105, 120, 98],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Conversões',
        data: [28, 40, 35, 50, 65, 78, 70],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  };

  const barData = {
    labels: ['Vendas', 'Marketing', 'Suporte', 'Financeiro', 'RH'],
    datasets: [
      {
        label: 'Desempenho por Departamento',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  const pieData = {
    labels: ['Novos', 'Em Andamento', 'Qualificados', 'Perdidos'],
    datasets: [
      {
        data: [300, 150, 100, 50],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };


  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Desempenho Mensal
          </h3>
          <Line data={lineData} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Leads por Status
          </h3>
          <Pie data={pieData} />
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Desempenho por Departamento
          </h3>
          <Bar data={barData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Atividade Recente
        </h3>
        <div className="space-y-4">
          {[
            { user: 'João Silva', action: 'adicionou um novo lead', time: '2 min atrás' },
            { user: 'Maria Santos', action: 'fechou um negócio', time: '15 min atrás' },
            { user: 'Pedro Costa', action: 'atualizou o contato', time: '1 hora atrás' },
            { user: 'Ana Oliveira', action: 'enviou proposta', time: '2 horas atrás' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-300">
                  {activity.user.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>{' '}
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
    </div>
  );
};

export default Dashboard;