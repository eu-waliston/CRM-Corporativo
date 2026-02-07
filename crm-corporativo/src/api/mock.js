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
  {
    id: 4,
    name: 'Mariana Lima',
    email: 'mariana@inovacao.com',
    phone: '(41) 96666-6664',
    company: 'Inovação Digital',
    jobTitle: 'Head of Sales',
    type: 'client',
    notes: 'Cliente premium',
    createdAt: '2023-12-15T16:45:00Z',
  },
  {
    id: 5,
    name: 'Ricardo Almeida',
    email: 'ricardo@global.com',
    phone: '(51) 95555-5555',
    company: 'Global Solutions',
    jobTitle: 'CTO',
    type: 'supplier',
    notes: 'Fornecedor de serviços',
    createdAt: '2023-12-20T11:10:00Z',
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
  {
    id: 4,
    title: 'Consultoria em Transformação Digital',
    contactName: 'Mariana Lima',
    company: 'Inovação Digital',
    value: 85000,
    stage: 'negotiation',
    closeDate: '2024-02-28',
    probability: '75%',
    tags: ['consultoria', 'digital'],
    createdAt: '2024-01-08T14:30:00Z',
  },
  {
    id: 5,
    title: 'Sistema de Business Intelligence',
    contactName: 'Ricardo Almeida',
    company: 'Global Solutions',
    value: 95000,
    stage: 'closed_won',
    closeDate: '2024-01-25',
    probability: '100%',
    tags: ['bi', 'analytics'],
    createdAt: '2024-01-03T09:45:00Z',
  },
];

// Simulação de delay de API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Autenticação
  login: async (credentials) => {
    await delay(500);

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Email ou senha inválidos');
    }

    const { password, ...userWithoutPassword } = user;

    return {
      token: 'mock-jwt-token-for-' + user.email,
      user: userWithoutPassword,
    };
  },

  // ========== LEADS ==========
  getLeads: async (params = {}) => {
    await delay(300);

    let filteredLeads = [...mockLeads];

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

    return filteredLeads;
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

  // ========== CONTACTS ==========
  getContacts: async (params = {}) => {
    await delay(300);

    let filteredContacts = [...mockContacts];

    if (params.type) {
      filteredContacts = filteredContacts.filter(contact => contact.type === params.type);
    }

    if (params.company) {
      filteredContacts = filteredContacts.filter(contact =>
        contact.company.toLowerCase().includes(params.company.toLowerCase())
      );
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

    return filteredContacts;
  },

  createContact: async (contactData) => {
    await delay(300);

    const newContact = {
      id: mockContacts.length + 1,
      ...contactData,
      createdAt: new Date().toISOString(),
    };

    mockContacts.unshift(newContact);
    return newContact;
  },

  updateContact: async (id, contactData) => {
    await delay(300);

    const index = mockContacts.findIndex(contact => contact.id === parseInt(id));
    if (index === -1) {
      throw new Error('Contato não encontrado');
    }

    mockContacts[index] = {
      ...mockContacts[index],
      ...contactData,
    };

    return mockContacts[index];
  },

  deleteContact: async (id) => {
    await delay(300);

    const index = mockContacts.findIndex(contact => contact.id === parseInt(id));
    if (index === -1) {
      throw new Error('Contato não encontrado');
    }

    mockContacts.splice(index, 1);
    return { success: true };
  },

  // ========== DEALS ==========
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

    return filteredDeals;
  },

  createDeal: async (dealData) => {
    await delay(300);

    const newDeal = {
      id: mockDeals.length + 1,
      ...dealData,
      createdAt: new Date().toISOString(),
    };

    mockDeals.unshift(newDeal);
    return newDeal;
  },

  updateDeal: async (id, dealData) => {
    await delay(300);

    const index = mockDeals.findIndex(deal => deal.id === parseInt(id));
    if (index === -1) {
      throw new Error('Negócio não encontrado');
    }

    mockDeals[index] = {
      ...mockDeals[index],
      ...dealData,
    };

    return mockDeals[index];
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

  deleteDeal: async (id) => {
    await delay(300);

    const index = mockDeals.findIndex(deal => deal.id === parseInt(id));
    if (index === -1) {
      throw new Error('Negócio não encontrado');
    }

    mockDeals.splice(index, 1);
    return { success: true };
  },

  // ========== DASHBOARD ==========
  getDashboardStats: async () => {
    await delay(300);

    const totalLeads = mockLeads.length;
    const totalContacts = mockContacts.length;
    const totalDeals = mockDeals.length;

    const totalRevenue = mockDeals
      .filter(deal => deal.stage === 'closed_won')
      .reduce((sum, deal) => sum + deal.value, 0);

    const conversionRate = totalDeals > 0
      ? Math.round((mockDeals.filter(d => d.stage === 'closed_won').length / totalLeads) * 100)
      : 0;

    return {
      totalLeads,
      totalContacts,
      totalDeals,
      totalRevenue,
      conversionRate,
      recentLeads: mockLeads.slice(0, 5),
      recentDeals: mockDeals.slice(0, 5),
    };
  },

  // ========== REPORTS ==========
    // ========== REPORTS ==========
  getReports: async (params = {}) => {
    await delay(300);

    // Remova as variáveis não utilizadas ou use-as
    const { startDate, endDate } = params;

    // Simula dados de relatório
    const monthlyRevenue = [
      { month: 'Jan', revenue: 65000, target: 60000 },
      { month: 'Fev', revenue: 79000, target: 70000 },
      { month: 'Mar', revenue: 82000, target: 80000 },
      { month: 'Abr', revenue: 91000, target: 90000 },
      { month: 'Mai', revenue: 105000, target: 100000 },
      { month: 'Jun', revenue: 120000, target: 110000 },
      { month: 'Jul', revenue: 98000, target: 120000 },
    ];

    // Se quiser usar startDate e endDate para filtrar (exemplo):
    // const filteredRevenue = monthlyRevenue.filter(item => {
    //   const monthYear = item.month + ' 2024'; // simplificado
    //   // Lógica de filtro baseada nas datas
    //   return true;
    // });

    const conversionBySource = [
      { source: 'Website', conversion: 3.2, leads: 156 },
      { source: 'Redes Sociais', conversion: 2.1, leads: 89 },
      { source: 'Email', conversion: 4.5, leads: 123 },
      { source: 'Indicação', conversion: 6.8, leads: 67 },
      { source: 'Eventos', conversion: 5.2, leads: 45 },
    ];

    const teamPerformance = [
      { name: 'João S.', sales: 125000, target: 120000 },
      { name: 'Maria A.', sales: 98000, target: 100000 },
      { name: 'Pedro C.', sales: 156000, target: 150000 },
      { name: 'Ana L.', sales: 112000, target: 110000 },
      { name: 'Carlos M.', sales: 89000, target: 90000 },
    ];

    const topProducts = [
      { product: 'Produto A', sales: 35, revenue: 245000 },
      { product: 'Produto B', sales: 25, revenue: 175000 },
      { product: 'Produto C', sales: 20, revenue: 140000 },
      { product: 'Produto D', sales: 12, revenue: 84000 },
      { product: 'Produto E', sales: 8, revenue: 56000 },
    ];

    return {
      monthlyRevenue,
      conversionBySource,
      teamPerformance,
      topProducts,
      kpis: {
        totalRevenue: 628500,
        newCustomers: 245,
        cac: 450,
        ltv: 2800,
        churnRate: 2.4,
        satisfaction: 4.7,
      },
      // Adicione um log para mostrar que os parâmetros estão sendo recebidos
      _params: { startDate, endDate }, // Adicione isto para usar as variáveis
    };
  },
};

export default mockApi;