import React, { useState } from 'react';

import * as Icons from '@heroicons/react/24/outline';

import {
  DocumentIcon,
  DocumentTextIcon,
  DocumentArrowUpIcon,
  FolderIcon,
  EyeIcon,
  // DownloadIcon,
  TrashIcon,
  ShareIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  // SearchIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const categories = [
    { id: 'all', name: 'Todos', count: 42 },
    { id: 'contracts', name: 'Contratos', count: 8 },
    { id: 'proposals', name: 'Propostas', count: 12 },
    { id: 'invoices', name: 'Faturas', count: 15 },
    { id: 'reports', name: 'Relatórios', count: 5 },
    { id: 'other', name: 'Outros', count: 2 },
  ];

  const documentStatus = {
    signed: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      icon: CheckCircleIcon,
    },
    pending: {
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      icon: ClockIcon,
    },
    expired: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      icon: XCircleIcon,
    },
    draft: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      icon: DocumentTextIcon,
    },
  };

  const mockDocuments = [
    {
      id: 1,
      name: 'Contrato Tech Solutions.pdf',
      category: 'contracts',
      size: '2.4 MB',
      type: 'PDF',
      status: 'signed',
      uploadedBy: 'João Silva',
      uploadedAt: '2024-01-15T10:30:00Z',
      tags: ['contrato', 'assinado'],
    },
    {
      id: 2,
      name: 'Proposta Comercial - Business Consulting.docx',
      category: 'proposals',
      size: '1.8 MB',
      type: 'DOCX',
      status: 'pending',
      uploadedBy: 'Maria Santos',
      uploadedAt: '2024-01-14T14:20:00Z',
      tags: ['proposta', 'comercial'],
    },
    {
      id: 3,
      name: 'Fatura #00123.pdf',
      category: 'invoices',
      size: '1.2 MB',
      type: 'PDF',
      status: 'signed',
      uploadedBy: 'Pedro Costa',
      uploadedAt: '2024-01-13T09:15:00Z',
      tags: ['fatura', 'paga'],
    },
    {
      id: 4,
      name: 'Relatório Mensal de Vendas.xlsx',
      category: 'reports',
      size: '3.1 MB',
      type: 'XLSX',
      status: 'draft',
      uploadedBy: 'Ana Oliveira',
      uploadedAt: '2024-01-12T16:45:00Z',
      tags: ['relatório', 'vendas'],
    },
    {
      id: 5,
      name: 'Termo de Confidencialidade.pdf',
      category: 'contracts',
      size: '1.5 MB',
      type: 'PDF',
      status: 'expired',
      uploadedBy: 'Carlos Mendes',
      uploadedAt: '2024-01-11T11:10:00Z',
      tags: ['confidencial', 'expirado'],
    },
    {
      id: 6,
      name: 'Apresentação Produto.pptx',
      category: 'other',
      size: '4.2 MB',
      type: 'PPTX',
      status: 'signed',
      uploadedBy: 'Mariana Lima',
      uploadedAt: '2024-01-10T10:30:00Z',
      tags: ['apresentação', 'produto'],
    },
  ];

  const fileTypes = [
    {
      type: 'PDF',
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    },
    {
      type: 'DOCX',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    },
    {
      type: 'XLSX',
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    },
    {
      type: 'PPTX',
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    },
    {
      type: 'JPG',
      color:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    },
  ];

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setUploading(true);

    // Simular upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFiles([]);
      alert(`${files.length} arquivo(s) enviado(s) com sucesso!`);
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      // Implementar exclusão
      alert('Documento excluído com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Documentos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie todos os documentos do seu negócio
          </p>
        </div>
        <div className="flex space-x-3">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              startIcon={
                uploading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <DocumentArrowUpIcon className="w-4 h-4" />
                )
              }
              disabled={uploading}
            >
              {uploading ? 'Enviando...' : 'Enviar Arquivos'}
            </Button>
          </label>
          <Button startIcon={<PlusIcon className="w-4 h-4" />}>
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <FolderIcon className="w-4 h-4 mr-2" />
              {category.name}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Icons.AcademicCapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            defaultValue=""
          >
            <option value="">Todos os status</option>
            <option value="signed">Assinado</option>
            <option value="pending">Pendente</option>
            <option value="expired">Expirado</option>
            <option value="draft">Rascunho</option>
          </select>

          <div className="flex gap-2">
            <Button
              variant="outline"
              startIcon={<FunnelIcon className="w-4 h-4" />}
            >
              Mais Filtros
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Limpar
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      {selectedFiles.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <DocumentArrowUpIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-medium text-blue-900 dark:text-blue-300">
                {selectedFiles.length} arquivo(s) selecionado(s)
              </span>
            </div>
            <button
              onClick={() => setSelectedFiles([])}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Cancelar
            </button>
          </div>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <DocumentIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {uploading && (
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Enviando...
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <DocumentTextIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum documento encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm
              ? 'Nenhum documento corresponde à sua busca'
              : 'Comece enviando seu primeiro documento'}
          </p>
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <Button startIcon={<DocumentArrowUpIcon className="w-4 h-4" />}>
              Enviar Primeiro Documento
            </Button>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const StatusIcon = documentStatus[doc.status].icon;

            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <DocumentIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full mb-1 ${
                            fileTypes.find((t) => t.type === doc.type)?.color ||
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {doc.type}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {doc.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <Icons.ArrowDownIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Tamanho:
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {doc.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <div className="flex items-center">
                        <StatusIcon className="w-4 h-4 mr-1" />
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            documentStatus[doc.status].color
                          }`}
                        >
                          {doc.status === 'signed' && 'Assinado'}
                          {doc.status === 'pending' && 'Pendente'}
                          {doc.status === 'expired' && 'Expirado'}
                          {doc.status === 'draft' && 'Rascunho'}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>Enviado por: {doc.uploadedBy}</p>
                      <p>
                        Em:{' '}
                        {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doc.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <button className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Storage Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Visão Geral do Armazenamento
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Espaço utilizado</span>
              <span>14.2 GB de 50 GB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: '28.4%' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                42
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Documentos
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                8
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contratos
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                15
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faturas
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                5
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Relatórios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
