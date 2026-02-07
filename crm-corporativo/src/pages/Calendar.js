import React, { useState } from 'react';
import * as Icons from '@heroicons/react/24/outline';

import {
  CalendarIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  MapPinIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ViewColumnsIcon,
  ViewListIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day', 'agenda'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Dias da semana
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Meses
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  // Eventos mockados
  const mockEvents = [
    {
      id: 1,
      title: 'Reunião com Tech Solutions',
      description: 'Apresentação da proposta comercial',
      date: new Date(2024, 0, 15, 10, 30),
      endDate: new Date(2024, 0, 15, 12, 0),
      type: 'meeting',
      participants: ['Carlos Santos', 'João Silva'],
      location: 'Sala de Reuniões A',
      status: 'confirmed',
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Follow-up Business Consulting',
      description: 'Acompanhamento da implementação',
      date: new Date(2024, 0, 16, 14, 0),
      endDate: new Date(2024, 0, 16, 15, 0),
      type: 'call',
      participants: ['Ana Oliveira'],
      location: 'Online',
      status: 'confirmed',
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Apresentação Produto Novo',
      description: 'Demonstração do novo produto para equipe',
      date: new Date(2024, 0, 17, 9, 0),
      endDate: new Date(2024, 0, 17, 11, 0),
      type: 'presentation',
      participants: ['Equipe de Vendas'],
      location: 'Auditório',
      status: 'pending',
      color: 'bg-purple-500',
    },
    {
      id: 4,
      title: 'Entrega de Relatório Mensal',
      description: 'Prazo final para entrega do relatório',
      date: new Date(2024, 0, 18, 17, 0),
      endDate: new Date(2024, 0, 18, 18, 0),
      type: 'deadline',
      participants: ['Gerência'],
      location: 'Sistema',
      status: 'confirmed',
      color: 'bg-orange-500',
    },
    {
      id: 5,
      title: 'Treinamento CRM',
      description: 'Treinamento da nova funcionalidade',
      date: new Date(2024, 0, 19, 13, 0),
      endDate: new Date(2024, 0, 19, 16, 0),
      type: 'training',
      participants: ['Todos os usuários'],
      location: 'Sala de Treinamento',
      status: 'confirmed',
      color: 'bg-indigo-500',
    },
    {
      id: 6,
      title: 'Revisão de Contratos',
      description: 'Revisão dos contratos pendentes',
      date: new Date(2024, 0, 20, 11, 0),
      endDate: new Date(2024, 0, 20, 12, 30),
      type: 'review',
      participants: ['Jurídico', 'Vendas'],
      location: 'Sala de Reuniões B',
      status: 'cancelled',
      color: 'bg-red-500',
    },
  ];

  // Tipos de evento
  const eventTypes = [
    {
      id: 'meeting',
      name: 'Reunião',
      color: 'bg-blue-500',
      icon: UserGroupIcon,
    },
    {
      id: 'call',
      name: 'Ligação',
      color: 'bg-green-500',
      icon: VideoCameraIcon,
    },
    {
      id: 'presentation',
      name: 'Apresentação',
      color: 'bg-purple-500',
      icon: CalendarIcon,
    },
    { id: 'deadline', name: 'Prazo', color: 'bg-orange-500', icon: ClockIcon },
    {
      id: 'training',
      name: 'Treinamento',
      color: 'bg-indigo-500',
      icon: CalendarIcon,
    },
    { id: 'review', name: 'Revisão', color: 'bg-red-500', icon: CalendarIcon },
  ];

  // Status de evento
  const eventStatus = {
    confirmed: {
      label: 'Confirmado',
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      icon: CheckCircleIcon,
    },
    pending: {
      label: 'Pendente',
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      icon: ClockIcon,
    },
    cancelled: {
      label: 'Cancelado',
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      icon: XCircleIcon,
    },
  };

  // Funções de navegação
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Gerar dias do mês
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isToday: false,
        events: [],
      });
    }

    // Dias do mês atual
    const today = new Date();
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      // Filtrar eventos deste dia
      const dayEvents = mockEvents.filter(
        (event) =>
          event.date.getDate() === day &&
          event.date.getMonth() === month &&
          event.date.getFullYear() === year
      );

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: dayEvents,
      });
    }

    // Dias do próximo mês
    const totalCells = 42; // 6 semanas * 7 dias
    const nextMonthDays = totalCells - days.length;

    for (let day = 1; day <= nextMonthDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        events: [],
      });
    }

    return days;
  };

  // Gerar horas do dia
  const generateDayHours = () => {
    const hours = [];
    for (let i = 8; i <= 18; i++) {
      hours.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        hour: i,
        events: mockEvents.filter(
          (event) =>
            event.date.getHours() === i &&
            event.date.toDateString() === currentDate.toDateString()
        ),
      });
    }
    return hours;
  };

  // Eventos da semana atual
  const getWeekEvents = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekEvents = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const events = mockEvents.filter(
        (event) => event.date.toDateString() === day.toDateString()
      );

      weekEvents.push({
        date: day,
        dayOfWeek: daysOfWeek[i],
        events,
      });
    }

    return weekEvents;
  };

  // Renderizar visualização do mês
  const renderMonthView = () => {
    const days = generateMonthDays();

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-3 text-center font-medium text-gray-700 dark:text-gray-300"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-32 border-r border-b border-gray-200 dark:border-gray-700 p-2 transition-colors ${
                day.isCurrentMonth
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-gray-50 dark:bg-gray-900/50'
              } ${day.isToday ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
              onClick={() => {
                setCurrentDate(day.date);
                setViewMode('day');
              }}
            >
              {/* Número do dia */}
              <div className="flex justify-between items-start mb-1">
                <span
                  className={`text-sm font-medium ${
                    day.isCurrentMonth
                      ? day.isToday
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {day.date.getDate()}
                </span>
                {day.events.length > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {day.events.length}
                  </span>
                )}
              </div>

              {/* Eventos do dia */}
              <div className="space-y-1">
                {day.events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`px-2 py-1 rounded text-xs truncate ${event.color} text-white cursor-pointer hover:opacity-90`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-90">
                      {event.date.getHours().toString().padStart(2, '0')}:
                      {event.date.getMinutes().toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                    +{day.events.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar visualização da semana
  const renderWeekView = () => {
    const weekEvents = getWeekEvents();

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        {/* Cabeçalho da semana */}
        <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
          <div className="p-3 font-medium text-gray-700 dark:text-gray-300">
            Hora
          </div>
          {weekEvents.map((day) => (
            <div
              key={day.dayOfWeek}
              className={`p-3 text-center font-medium ${
                day.date.toDateString() === new Date().toDateString()
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="text-sm">{day.dayOfWeek}</div>
              <div className="text-lg font-bold">{day.date.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Linhas do tempo */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
            <div key={hour} className="grid grid-cols-8">
              <div className="p-3 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                {hour}:00
              </div>
              {weekEvents.map((day, dayIndex) => {
                const hourEvents = mockEvents.filter(
                  (event) =>
                    event.date.getDate() === day.date.getDate() &&
                    event.date.getMonth() === day.date.getMonth() &&
                    event.date.getFullYear() === day.date.getFullYear() &&
                    event.date.getHours() === hour
                );

                return (
                  <div
                    key={dayIndex}
                    className="p-1 border-r border-gray-200 dark:border-gray-700 min-h-16 relative"
                  >
                    {hourEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`absolute left-1 right-1 ${event.color} text-white rounded p-2 text-xs cursor-pointer hover:opacity-90`}
                        style={{
                          top: `${(event.date.getMinutes() / 60) * 100}%`,
                          height: `${((event.endDate.getTime() - event.date.getTime()) / (1000 * 60 * 60)) * 100}%`,
                        }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="font-medium truncate">
                          {event.title}
                        </div>
                        <div className="opacity-90 truncate">
                          {event.date.getHours().toString().padStart(2, '0')}:
                          {event.date.getMinutes().toString().padStart(2, '0')}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar visualização do dia
  const renderDayView = () => {
    const dayHours = generateDayHours();

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        {/* Cabeçalho do dia */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {currentDate.getDate()} de {months[currentDate.getMonth()]} de{' '}
            {currentDate.getFullYear()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {daysOfWeek[currentDate.getDay()]}
          </div>
        </div>

        {/* Linhas do tempo do dia */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {dayHours.map((hour) => (
            <div key={hour.time} className="flex min-h-20">
              <div className="w-20 p-3 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                {hour.time}
              </div>
              <div className="flex-1 p-1 relative">
                {hour.events.map((event) => (
                  <div
                    key={event.id}
                    className={`absolute left-1 right-1 ${event.color} text-white rounded p-3 cursor-pointer hover:opacity-90`}
                    style={{
                      top: `${(event.date.getMinutes() / 60) * 100}%`,
                      height: `${((event.endDate.getTime() - event.date.getTime()) / (1000 * 60 * 60)) * 100}%`,
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="font-medium mb-1">{event.title}</div>
                    <div className="text-sm opacity-90">
                      {event.description}
                    </div>
                    <div className="text-xs opacity-80 mt-1">
                      {event.date.getHours().toString().padStart(2, '0')}:
                      {event.date.getMinutes().toString().padStart(2, '0')} -
                      {event.endDate.getHours().toString().padStart(2, '0')}:
                      {event.endDate.getMinutes().toString().padStart(2, '0')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar visualização de agenda
  const renderAgendaView = () => {
    const upcomingEvents = [...mockEvents]
      .sort((a, b) => a.date - b.date)
      .filter((event) => event.date >= new Date());

    return (
      <div className="space-y-4">
        {upcomingEvents.map((event) => {
          const StatusIcon = eventStatus[event.status].icon;

          return (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${event.color} mr-3`}>
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${eventStatus[event.status].color}`}
                      >
                        <StatusIcon className="w-3 h-3 inline mr-1" />
                        {eventStatus[event.status].label}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          event.type === 'meeting'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : event.type === 'call'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {eventTypes.find((t) => t.id === event.type)?.name ||
                          'Evento'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {event.date.getDate().toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {months[event.date.getMonth()].slice(0, 3)}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {event.date.getHours().toString().padStart(2, '0')}:
                    {event.date.getMinutes().toString().padStart(2, '0')} -
                    {event.endDate.getHours().toString().padStart(2, '0')}:
                    {event.endDate.getMinutes().toString().padStart(2, '0')}
                  </div>

                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>

                <div className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <div className="text-sm">{event.participants.join(', ')}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Renderizar a visualização atual
  const renderCurrentView = () => {
    switch (viewMode) {
      case 'month':
        return renderMonthView();
      case 'week':
        return renderWeekView();
      case 'day':
        return renderDayView();
      case 'agenda':
        return renderAgendaView();
      default:
        return renderMonthView();
    }
  };

  // Modal de detalhes do evento
  const renderEventModal = () => {
    if (!selectedEvent) return null;

    const StatusIcon = eventStatus[selectedEvent.status].icon;
    const EventTypeIcon =
      eventTypes.find((t) => t.id === selectedEvent.type)?.icon || CalendarIcon;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl ${selectedEvent.color} mr-4`}>
                  <EventTypeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${eventStatus[selectedEvent.status].color}`}
                    >
                      <StatusIcon className="w-4 h-4 inline mr-1" />
                      {eventStatus[selectedEvent.status].label}
                    </span>
                    <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {
                        eventTypes.find((t) => t.id === selectedEvent.type)
                          ?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Detalhes */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Detalhes
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Data e Hora
                  </h4>
                  <div className="flex items-center text-gray-900 dark:text-white">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    {selectedEvent.date.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="mt-1 ml-7">
                    {selectedEvent.date.getHours().toString().padStart(2, '0')}:
                    {selectedEvent.date
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}{' '}
                    -
                    {selectedEvent.endDate
                      .getHours()
                      .toString()
                      .padStart(2, '0')}
                    :
                    {selectedEvent.endDate
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Local
                  </h4>
                  <div className="flex items-center text-gray-900 dark:text-white">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    {selectedEvent.location}
                  </div>
                </div>

                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Participantes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.participants.map((participant, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs mr-2">
                          {participant.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {participant}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                startIcon={<TrashIcon className="w-4 h-4" />}
                onClick={() => {
                  if (
                    window.confirm(
                      'Tem certeza que deseja excluir este evento?'
                    )
                  ) {
                    setSelectedEvent(null);
                    alert('Evento excluído com sucesso!');
                  }
                }}
              >
                Excluir
              </Button>
              <Button
                variant="outline"
                startIcon={<PencilIcon className="w-4 h-4" />}
                onClick={() => setShowEventModal(true)}
              >
                Editar
              </Button>
              <Button
                startIcon={<BellIcon className="w-4 h-4" />}
                onClick={() => alert('Lembrete configurado!')}
              >
                Adicionar Lembrete
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Calendário
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus compromissos e eventos
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowSidebar(!showSidebar)}
            startIcon={<FunnelIcon className="w-4 h-4" />}
          >
            {showSidebar ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
          <Button
            startIcon={<PlusIcon className="w-4 h-4" />}
            onClick={() => setShowEventModal(true)}
          >
            Novo Evento
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de Filtros */}
        {showSidebar && (
          <div className="lg:w-64 space-y-6">
            {/* Navegação */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Hoje
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-6">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-gray-500 dark:text-gray-400"
                  >
                    {day.charAt(0)}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button onClick={goToToday} fullWidth>
                  Ir para Hoje
                </Button>
              </div>
            </div>

            {/* Filtros de Visualização */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Visualização
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setViewMode('month')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                    viewMode === 'month'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Mês
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                    viewMode === 'week'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ViewColumnsIcon className="w-4 h-4 mr-2" />
                  Semana
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                    viewMode === 'day'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Dia
                </button>
                <button
                  onClick={() => setViewMode('agenda')}
                  className={`flex items-center justify-center p-3 rounded-lg transition-colors ${
                    viewMode === 'agenda'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icons.ViewfinderCircleIcon className="w-4 h-4 mr-2" />
                  Agenda
                </button>
              </div>
            </div>

            {/* Tipos de Evento */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Tipos de Evento
              </h3>
              <div className="space-y-2">
                {eventTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.id} className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${type.color} mr-3`}
                      ></div>
                      <Icon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {type.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Próximos Eventos */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                {mockEvents
                  .filter((event) => event.date >= new Date())
                  .sort((a, b) => a.date - b.date)
                  .slice(0, 3)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div
                        className={`w-2 h-8 rounded ${event.color} mr-3`}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {event.date.getDate().toString().padStart(2, '0')}/
                          {event.date.getMonth() + 1} •
                          {event.date.getHours().toString().padStart(2, '0')}:
                          {event.date.getMinutes().toString().padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="flex-1">
          {/* Controles de Visualização */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {viewMode === 'month' && 'Calendário Mensal'}
                  {viewMode === 'week' && 'Calendário Semanal'}
                  {viewMode === 'day' && 'Calendário Diário'}
                  {viewMode === 'agenda' && 'Agenda'}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {mockEvents.filter((e) => e.date >= new Date()).length}{' '}
                  eventos futuros
                </div>
                <div className="flex items-center space-x-2">
                  {viewMode !== 'agenda' && (
                    <>
                      <button
                        onClick={goToPreviousMonth}
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToToday}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Hoje
                      </button>
                      <button
                        onClick={goToNextMonth}
                        className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Calendário */}
          {renderCurrentView()}
        </div>
      </div>

      {/* Modal de Evento */}
      {selectedEvent && renderEventModal()}
    </div>
  );
};

export default Calendar;
