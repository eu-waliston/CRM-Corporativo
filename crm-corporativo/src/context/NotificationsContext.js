import React, { createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationsContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within NotificationsProvider'
    );
  }
  return context;
};

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3); // Mock inicial

  // Adicionar nova notificação
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };

    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // Mantém apenas 10 mais recentes
    setUnreadCount((prev) => prev + 1);

    // Toque de notificação (opcional)
    if (Notification.permission === 'granted') {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/logo192.png',
      });
    }
  }, []);

  // Marcar como lida
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Marcar todas como lidas
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  }, []);

  // Remover notificação
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => {
      const removed = prev.find((n) => n.id === id);
      if (removed && !removed.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      return prev.filter((notification) => notification.id !== id);
    });
  }, []);

  // Remover todas as notificações
  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Dados mock para desenvolvimento
  const mockNotifications = [
    {
      id: '1',
      type: 'success',
      title: 'Lead Convertido',
      message: 'Carlos Santos fechou um negócio de R$ 75.000',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutos atrás
      icon: 'CheckCircleIcon',
      read: false,
      link: '/leads/1',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Prazo Próximo',
      message: 'Contrato com Tech Solutions vence em 3 dias',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutos atrás
      icon: 'ClockIcon',
      read: false,
      link: '/documents/1',
    },
    {
      id: '3',
      type: 'info',
      title: 'Nova Mensagem',
      message: 'Você recebeu uma nova mensagem de Ana Oliveira',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hora atrás
      icon: 'ChatBubbleLeftRightIcon',
      read: true,
      link: '/communications',
    },
    {
      id: '4',
      type: 'error',
      title: 'Falha no Envio',
      message: 'Falha ao enviar email para pedro@techbr.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 horas atrás
      icon: 'XCircleIcon',
      read: true,
      link: '/communications',
    },
    {
      id: '5',
      type: 'success',
      title: 'Relatório Gerado',
      message: 'Relatório mensal foi gerado com sucesso',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 dia atrás
      icon: 'DocumentTextIcon',
      read: true,
      link: '/reports',
    },
  ];

  // Inicializar com dados mock em desenvolvimento
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && notifications.length === 0) {
      setNotifications(mockNotifications);
      setUnreadCount(2); // 2 não lidas
    }
  }, [notifications.length]);

  // Solicitar permissão para notificações do navegador
  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
