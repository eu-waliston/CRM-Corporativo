import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext';
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  XCircleIcon,
  DocumentTextIcon,
  CheckIcon,
  TrashIcon,
  EnvelopeIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotifications();

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ícones por tipo de notificação
  // eslint-disable-next-line
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

  // Cores por tipo de notificação
  const colorMap = {
    success:
      'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300',
    warning:
      'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    info: 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    error: 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300',
    document:
      'text-purple-500 bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
    email:
      'text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300',
    user: 'text-pink-500 bg-pink-100 dark:bg-pink-900 dark:text-pink-300',
    payment:
      'text-emerald-500 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300',
  };

  // Formatar tempo relativo
  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours} h atrás`;
    if (diffDays < 7) return `${diffDays} dia(s) atrás`;

    return date.toLocaleDateString('pt-BR');
  };

  // Lidar com clique na notificação
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setIsOpen(false);

    if (notification.link) {
      navigate(notification.link);
    }
  };

  // Adicionar notificação de teste
  const addTestNotification = useCallback(() => {
    const testTypes = ['success', 'warning', 'info', 'error'];
    const testMessages = [
      'Novo lead cadastrado no sistema',
      'Reunião agendada para amanhã às 10h',
      'Atualização do sistema concluída',
      'Erro ao processar pagamento',
    ];

    const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
    const randomMessage =
      testMessages[Math.floor(Math.random() * testMessages.length)];
    const randomIcon = iconMap[randomType];

    addNotification({
      type: randomType,
      title: 'Notificação de Teste',
      message: randomMessage,
      icon: randomIcon ? randomIcon.name : 'BellIcon',
    });
  }, [addNotification, iconMap]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group"
      >
        <BellIcon className="w-4 h-4" />

        {/* Badge de contagem */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border border-white dark:border-gray-800 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}

        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Notificações
          {unreadCount > 0 && ` (${unreadCount} não lidas)`}
        </div>
      </button>

      {/* Dropdown de Notificações */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-fade-in">
          {/* Cabeçalho */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notificações
                {unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                    {unreadCount} nova(s)
                  </span>
                )}
              </h3>

              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center"
                    title="Marcar todas como lidas"
                  >
                    <CheckIcon className="w-3 h-3 mr-1" />
                    Marcar todas
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium flex items-center"
                    title="Limpar todas"
                  >
                    <TrashIcon className="w-3 h-3 mr-1" />
                    Limpar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Lista de Notificações */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                  <BellIcon className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhuma notificação
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Novas notificações aparecerão aqui
                </p>

                {/* Botão de teste (apenas desenvolvimento) */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={addTestNotification}
                    className="mt-4 px-3 py-1.5 text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  >
                    Adicionar Notificação de Teste
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map((notification) => {
                  const IconComponent = iconMap[notification.type] || BellIcon;

                  return (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                        !notification.read
                          ? 'bg-blue-50/50 dark:bg-blue-900/10'
                          : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Ícone */}
                        <div
                          className={`p-2 rounded-lg ${colorMap[notification.type] || 'bg-gray-100 text-gray-500'}`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p
                              className={`font-medium ${
                                !notification.read
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>

                          {notification.link && (
                            <div className="mt-2">
                              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                                Clique para ver detalhes →
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Ações */}
                        <div className="flex flex-col items-center space-y-1">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                            title="Remover notificação"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {notifications.length} notificação(ões)
                </span>
                <button
                  onClick={() => navigate('/notifications')}
                  className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  Ver todas →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
