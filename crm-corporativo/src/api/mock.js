// Mock de dados para desenvolvimento
const mockUsers = [
  {
    id: 1,
    email: 'admin@crm.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    department: 'Administração',
    avatar: 'A',
  },
  {
    id: 2,
    email: 'vendas@crm.com',
    password: 'vendas123',
    name: 'João Silva',
    role: 'manager',
    department: 'Vendas',
    avatar: 'J',
  },
  {
    id: 3,
    email: 'teste@crm.com',
    password: 'teste123',
    name: 'Usuário Teste',
    role: 'user',
    department: 'Marketing',
    avatar: 'U',
  },
];

const mockLeads = [
  {
    id: 1,
    name: 'Carlos Santos',
    email: 'carlos@empresa.com',
    phone: '(11) 99999-9991',
    company: 'Tech Solutions',
    jobTitle: 'CEO',
    source: 'website',
    status: 'new',
    value: 15000,
    notes: 'Interessado em nossa solução empresarial.',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Ana Oliveira',
    email: 'ana@consulting.com',
    phone: '(21) 98888-8882',
    company: 'Business Consulting',
    jobTitle: 'Diretora de Marketing',
    source: 'social',
    status: 'contacted',
    value: 25000,
    notes: 'Reunião agendada para próxima semana.',
    createdAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@techbr.com',
    phone: '(31) 97777-7773',
    company: 'TechBR',
    jobTitle: 'Gerente de TI',
    source: 'referral',
    status: 'qualified',
    value: 35000,
    notes: 'Aguardando proposta formal.',
    createdAt: '2024-01-05T09:15:00Z',
  },
  {
    id: 4,
    name: 'Mariana Lima',
    email: 'mariana@inovacao.com',
    phone: '(41) 96666-6664',
    company: 'Inovação Digital',
    jobTitle: 'Head of Sales',
    source: 'event',
    status: 'proposal',
    value: 45000,
    notes: 'Proposta enviada, aguardando retorno.',
    createdAt: '2024-01-02T16:45:00Z',
  },
  {
    id: 5,
    name: 'Ricardo Almeida',
    email: 'ricardo@global.com',
    phone: '(51) 95555-5555',
    company: 'Global Solutions',
    jobTitle: 'CTO',
    source: 'website',
    status: 'negotiation',
    value: 55000,
    notes: 'Negociação em andamento.',
    createdAt: '2023-12-28T11:10:00Z',
  },
];

const mockContacts = [
  {
    id: 1,
    name: 'Carlos Santos',
    email: 'carlos@empresa.com',
    phone: '(11) 99999-9991',
    company: 'Tech Solutions',
    jobTitle: 'CEO',
    type: 'client',
    notes: 'Cliente desde 2022',
    createdAt: '2023-12-01T10:30:00Z',
  },
  {
    id: 2,
    name: 'Ana Oliveira',
    email: 'ana@consulting.com',
    phone: '(21) 98888-8882',
    company: 'Business Consulting',
    jobTitle: 'Diretora de Marketing',
    type: 'lead',
    notes: 'Potencial cliente grande',
    createdAt: '2023-12-05T14:20:00Z',
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@techbr.com',
    phone: '(31) 97777-7773',
    company: 'TechBR',
    jobTitle: 'Gerente de TI',
    type: 'partner',
    notes: 'Parceiro estratégico',
    createdAt: '2023-12-10T09:15:00Z',
  },
];

const mockDeals = [
  {
    id: 1,
    title: 'Implementação CRM Enterprise',
    contactName: 'Carlos Santos',
    company: 'Tech Solutions',
    value: 75000,
    stage: 'prospecting',
    closeDate: '2024-02-15',
    probability: '30%',
    tags: ['enterprise', 'crm'],
    createdAt: '2024-01-10T10:30:00Z',
  },
  {
    id: 2,
    title: 'Sistema de Gestão',
    contactName: 'Ana Oliveira',
    company: 'Business Consulting',
    value: 52000,
    stage: 'qualification',
    closeDate: '2024-02-20',
    probability: '60%',
    tags: ['gestão', 'consultoria'],
    createdAt: '2024-01-05T14:20:00Z',
  },
  {
    id: 3,
    title: 'Plataforma E-commerce',
    contactName: 'Pedro Costa',
    company: 'TechBR',
    value: 125000,
    stage: 'proposal',
    closeDate: '2024-03-10',
    probability: '40%',
    tags: ['ecommerce', 'platform'],
    createdAt: '2024-01-02T09:15:00Z',
  },
];

// Simulação de delay de API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Autenticação
  login: async (credentials) => {
    await delay(500); // Simula delay de rede

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    // Remove a senha do objeto de retorno
    const { password, ...userWithoutPassword } = user;

    return {
      token: 'mock-jwt-token-for-' + user.email,
      user: userWithoutPassword,
    };
  },

  // Leads
  getLeads: async (params = {}) => {
    await delay(300);

    let filteredLeads = [...mockLeads];

    // Aplica filtros
    if (params.status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === params.status);
    }

    if (params.source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === params.source);
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredLeads = filteredLeads.filter(
        lead =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower)
      );
    }

    return {
      data: filteredLeads,
      total: filteredLeads.length,
      page: 1,
      limit: 10,
    };
  },

  createLead: async (leadData) => {
    await delay(300);

    const newLead = {
      id: mockLeads.length + 1,
      ...leadData,
      createdAt: new Date().toISOString(),
    };

    mockLeads.unshift(newLead);
    return newLead;
  },

  updateLead: async (id, leadData) => {
    await delay(300);

    const index = mockLeads.findIndex(lead => lead.id === parseInt(id));
    if (index === -1) {
      throw new Error('Lead não encontrado');
    }

    mockLeads[index] = {
      ...mockLeads[index],
      ...leadData,
    };

    return mockLeads[index];
  },

  deleteLead: async (id) => {
    await delay(300);

    const index = mockLeads.findIndex(lead => lead.id === parseInt(id));
    if (index === -1) {
      throw new Error('Lead não encontrado');
    }

    mockLeads.splice(index, 1);
    return { success: true };
  },

  // Contacts
  getContacts: async (params = {}) => {
    await delay(300);

    let filteredContacts = [...mockContacts];

    if (params.type) {
      filteredContacts = filteredContacts.filter(contact => contact.type === params.type);
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredContacts = filteredContacts.filter(
        contact =>
          contact.name.toLowerCase().includes(searchLower) ||
          contact.email.toLowerCase().includes(searchLower) ||
          contact.company.toLowerCase().includes(searchLower)
      );
    }

    return {
      data: filteredContacts,
      total: filteredContacts.length,
      page: 1,
      limit: 10,
    };
  },

  // Deals
  getDeals: async (params = {}) => {
    await delay(300);

    let filteredDeals = [...mockDeals];

    if (params.stage) {
      filteredDeals = filteredDeals.filter(deal => deal.stage === params.stage);
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredDeals = filteredDeals.filter(
        deal =>
          deal.title.toLowerCase().includes(searchLower) ||
          deal.contactName.toLowerCase().includes(searchLower) ||
          deal.company.toLowerCase().includes(searchLower)
      );
    }

    return {
      data: filteredDeals,
      total: filteredDeals.length,
      page: 1,
      limit: 10,
    };
  },

  updateDealStage: async (id, stage) => {
    await delay(300);

    const index = mockDeals.findIndex(deal => deal.id === parseInt(id));
    if (index === -1) {
      throw new Error('Negócio não encontrado');
    }

    mockDeals[index].stage = stage;
    return mockDeals[index];
  },
};

export default mockApi;