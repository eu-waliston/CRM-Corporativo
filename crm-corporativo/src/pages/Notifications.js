import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext';
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  XCircleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
  CheckIcon,
  TrashIcon,
  FilterIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAll,
    removeNotification,
    markAsRead,
  } = useNotifications();

  const [filter, setFilter] = React.useState('all'); // all, unread, read

  // Filtrar notificações
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  // Estatísticas
  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    read: notifications.filter((n) => n.read).length,
  };

  // Ícones por tipo
  const iconMap = {
    success: CheckCircleIcon,
    warning: ClockIcon,
    info: ChatBubbleLeftRightIcon,
    error: XCircleIcon,
    document: DocumentTextIcon,
    email: EnvelopeIcon,
    user: UserPlusIcon,
    payment: CurrencyDollarIcon,
  };

  // Cores por tipo
  const colorMap = {
    success:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    document:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    email:
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    user: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    payment:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  };

  // Formatar data
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
    }
  };

  // Agrupar por data
  const groupedNotifications = filteredNotifications.reduce(
    (groups, notification) => {
      const date = formatDate(notification.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notificações
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todas as suas notificações
          </p>
        </div>
        <div className="flex space-x-3">
          {stats.unread > 0 && (
            <Button
              variant="outline"
              startIcon={<CheckIcon className="w-4 h-4" />}
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              startIcon={<TrashIcon className="w-4 h-4" />}
              onClick={clearAll}
            >
              Limpar todas
            </Button>
          )}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Não lidas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.unread}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BellIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Lidas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.read}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <FilterIcon className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filtros</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Todas ({stats.total})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Não lidas ({stats.unread})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'read'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Lidas ({stats.read})
          </button>
        </div>
      </div>

      {/* Lista de Notificações */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <BellIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma notificação
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filter === 'all'
              ? 'Você não tem nenhuma notificação'
              : filter === 'unread'
                ? 'Você não tem notificações não lidas'
                : 'Você não tem notificações lidas'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(
            ([date, dateNotifications]) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
                  {date}
                </h3>
                <div className="space-y-3">
                  {dateNotifications.map((notification) => {
                    const IconComponent =
                      iconMap[notification.type] || BellIcon;

                    return (
                      <div
                        key={notification.id}
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow ${
                          !notification.read ? 'border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`p-3 rounded-lg ${colorMap[notification.type] || 'bg-gray-100'}`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4
                                    className={`font-semibold ${
                                      !notification.read
                                        ? 'text-gray-900 dark:text-white'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-3">
                                    <span
                                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        colorMap[notification.type]
                                      }`}
                                    >
                                      {notification.type === 'success' &&
                                        'Sucesso'}
                                      {notification.type === 'warning' &&
                                        'Aviso'}
                                      {notification.type === 'info' &&
                                        'Informação'}
                                      {notification.type === 'error' && 'Erro'}
                                      {notification.type === 'document' &&
                                        'Documento'}
                                      {notification.type === 'email' && 'Email'}
                                      {notification.type === 'user' &&
                                        'Usuário'}
                                      {notification.type === 'payment' &&
                                        'Pagamento'}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {new Date(
                                        notification.timestamp
                                      ).toLocaleTimeString('pt-BR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                                title="Marcar como lida"
                              >
                                <CheckIcon className="w-3 h-3 mr-1" />
                                Marcar como lida
                              </button>
                            )}
                            <button
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                              title="Remover notificação"
                            >
                              <TrashIcon className="w-3 h-3 mr-1" />
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
