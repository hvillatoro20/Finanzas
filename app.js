// Expense Tracker Application
class ExpenseTracker {
    constructor() {
        // Initialize properties
        this.transactions = [];
        this.budgets = [];
        this.categories = ['Food', 'Transport', 'Entertainment', 'Home', 'Health', 'Education', 'Other'];
        this.settings = {
            currency: '$',
            firstDayOfWeek: 1, // Monday
            theme: 'light'
        };
        
        // DOM Elements
        this.domElements = {
            // Navigation
            navItems: document.querySelectorAll('.nav-item'),
            menuToggle: document.getElementById('menu-toggle'),
            sidebar: document.getElementById('sidebar'),
            themeToggle: document.getElementById('theme-toggle'),
            
            // Dashboard
            dashboardSection: document.getElementById('dashboard'),
            incomeAmount: document.getElementById('income-amount'),
            expenseAmount: document.getElementById('expense-amount'),
            balanceAmount: document.getElementById('balance-amount'),
            incomeChange: document.getElementById('income-change'),
            expenseChange: document.getElementById('expense-change'),
            balanceChange: document.getElementById('balance-change'),
            dashboardPeriod: document.getElementById('dashboard-period'),
            recentTransactionsList: document.getElementById('recent-transactions-list'),
            spendingChart: document.getElementById('spending-chart'),
            
            // Transactions
            transactionsSection: document.getElementById('transactions'),
            allTransactionsList: document.getElementById('all-transactions-list'),
            transactionTypeFilter: document.getElementById('transaction-type-filter'),
            transactionCategoryFilter: document.getElementById('transaction-category-filter'),
            transactionDateFilter: document.getElementById('transaction-date-filter'),
            clearFilters: document.getElementById('clear-filters'),
            
            // Add Transaction
            addTransactionSection: document.getElementById('add-transaction'),
            transactionForm: document.getElementById('transaction-form'),
            transactionTypeRadios: document.querySelectorAll('input[name="transaction-type"]'),
            transactionAmount: document.getElementById('transaction-amount'),
            transactionDescription: document.getElementById('transaction-description'),
            transactionCategory: document.getElementById('transaction-category'),
            transactionDate: document.getElementById('transaction-date'),
            
            // Budgets
            budgetsSection: document.getElementById('budgets'),
            budgetsList: document.getElementById('budgets-list'),
            addBudgetBtn: document.getElementById('add-budget'),
            budgetProgressChart: document.getElementById('budget-progress-chart'),
            budgetModal: document.getElementById('budget-modal'),
            budgetForm: document.getElementById('budget-form'),
            budgetCategory: document.getElementById('budget-category'),
            budgetAmount: document.getElementById('budget-amount'),
            budgetPeriod: document.getElementById('budget-period'),
            closeModal: document.querySelector('.close-modal'),
            
            // Reports
            reportsSection: document.getElementById('reports'),
            reportPeriod: document.getElementById('report-period'),
            incomeVsExpenseChart: document.getElementById('income-vs-expense-chart'),
            categoryDistributionChart: document.getElementById('category-distribution-chart'),
            exportData: document.getElementById('export-data'),
            importData: document.getElementById('import-data'),
            importFile: document.getElementById('import-file'),
            clearData: document.getElementById('clear-data'),
            
            // Settings
            settingsSection: document.getElementById('settings'),
            currencySelect: document.getElementById('currency'),
            firstDayOfWeek: document.getElementById('first-day-of-week'),
            newCategory: document.getElementById('new-category'),
            addCategory: document.getElementById('add-category'),
            categoriesList: document.getElementById('categories-list'),
            saveSettings: document.getElementById('save-settings'),
            resetSettings: document.getElementById('reset-settings'),
            
            // Confirmation Modal
            confirmModal: document.getElementById('confirm-modal'),
            confirmTitle: document.getElementById('confirm-title'),
            confirmMessage: document.getElementById('confirm-message'),
            confirmCancel: document.getElementById('confirm-cancel'),
            confirmOk: document.getElementById('confirm-ok')
        };
        
        // Chart instances
        this.charts = {
            spending: null,
            incomeVsExpense: null,
            categoryDistribution: null
        };
        
        // Initialize the app
        this.init();
    }
    
    // Initialize the application
    init() {
        // Load data from localStorage
        this.loadData();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize UI
        this.initUI();
        
        // Render initial data
        this.renderAll();
    }
    
    // Load data from localStorage
    loadData() {
        // Load transactions
        const savedTransactions = localStorage.getItem('expenseTracker_transactions');
        if (savedTransactions) {
            this.transactions = JSON.parse(savedTransactions);
        }
        
        // Load budgets
        const savedBudgets = localStorage.getItem('expenseTracker_budgets');
        if (savedBudgets) {
            this.budgets = JSON.parse(savedBudgets);
        }
        
        // Load categories
        const savedCategories = localStorage.getItem('expenseTracker_categories');
        if (savedCategories) {
            this.categories = JSON.parse(savedCategories);
        }
        
        // Load settings
        const savedSettings = localStorage.getItem('expenseTracker_settings');
        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
        }
    }
    
    // Save data to localStorage
    saveData() {
        localStorage.setItem('expenseTracker_transactions', JSON.stringify(this.transactions));
        localStorage.setItem('expenseTracker_budgets', JSON.stringify(this.budgets));
        localStorage.setItem('expenseTracker_categories', JSON.stringify(this.categories));
        localStorage.setItem('expenseTracker_settings', JSON.stringify(this.settings));
    }
    
    // Setup all event listeners
    setupEventListeners() {
        // Navigation
        this.domElements.navItems.forEach(item => {
            item.addEventListener('click', () => this.switchSection(item.dataset.section));
        });
        
        this.domElements.menuToggle.addEventListener('click', () => {
            this.domElements.sidebar.classList.toggle('active');
        });
        
        this.domElements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Dashboard
        this.domElements.dashboardPeriod.addEventListener('change', () => {
            this.updateDashboard();
        });
        
        // Transactions
        this.domElements.transactionTypeFilter.addEventListener('change', () => {
            this.filterTransactions();
        });
        
        this.domElements.transactionCategoryFilter.addEventListener('change', () => {
            this.filterTransactions();
        });
        
        this.domElements.transactionDateFilter.addEventListener('change', () => {
            this.filterTransactions();
        });
        
        this.domElements.clearFilters.addEventListener('click', () => {
            this.clearTransactionFilters();
        });
        
        // Add Transaction
        this.domElements.transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        this.domElements.transactionTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateTransactionCategories();
            });
        });
        
        // Budgets
        this.domElements.addBudgetBtn.addEventListener('click', () => {
            this.showBudgetModal();
        });
        
        this.domElements.budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBudget();
        });
        
        this.domElements.closeModal.addEventListener('click', () => {
            this.hideBudgetModal();
        });
        
        // Reports
        this.domElements.reportPeriod.addEventListener('change', () => {
            this.updateReports();
        });
        
        this.domElements.exportData.addEventListener('click', () => {
            this.exportData();
        });
        
        this.domElements.importData.addEventListener('click', () => {
            this.domElements.importFile.click();
        });
        
        this.domElements.importFile.addEventListener('change', (e) => {
            this.importData(e);
        });
        
        this.domElements.clearData.addEventListener('click', () => {
            this.showConfirmModal(
                'Clear All Data',
                'Are you sure you want to delete all your data? This action cannot be undone.',
                () => this.clearAllData()
            );
        });
        
        // Settings
        this.domElements.saveSettings.addEventListener('click', () => {
            this.saveSettings();
        });
        
        this.domElements.resetSettings.addEventListener('click', () => {
            this.showConfirmModal(
                'Reset Settings',
                'Are you sure you want to reset all settings to default values?',
                () => this.resetSettings()
            );
        });
        
        this.domElements.addCategory.addEventListener('click', () => {
            this.addNewCategory();
        });
        
        // Confirmation Modal
        this.domElements.confirmCancel.addEventListener('click', () => {
            this.hideConfirmModal();
        });
        
        this.domElements.confirmOk.addEventListener('click', () => {
            if (this.confirmCallback) {
                this.confirmCallback();
            }
            this.hideConfirmModal();
        });
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.domElements.budgetModal) {
                this.hideBudgetModal();
            }
            if (e.target === this.domElements.confirmModal) {
                this.hideConfirmModal();
            }
        });
    }
    
    // Initialize UI elements
    initUI() {
        // Set theme
        document.body.setAttribute('data-theme', this.settings.theme);
        
        // Set current date in transaction form
        this.domElements.transactionDate.value = this.formatDateForInput(new Date());
        
        // Update category selects
        this.updateTransactionCategories();
        this.updateBudgetCategories();
        
        // Set settings values
        this.domElements.currencySelect.value = this.settings.currency;
        this.domElements.firstDayOfWeek.value = this.settings.firstDayOfWeek;
        this.renderCategoriesList();
        
        // Initialize charts
        this.initCharts();
    }
    
    // Render all data
    renderAll() {
        this.updateDashboard();
        this.renderTransactions();
        this.renderBudgets();
        this.updateReports();
    }
    
    // Switch between sections
    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Deactivate all nav items
        this.domElements.navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionId).classList.add('active');
        
        // Activate selected nav item
        document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth < 992) {
            this.domElements.sidebar.classList.remove('active');
        }
        
        // Update specific section if needed
        if (sectionId === 'dashboard') {
            this.updateDashboard();
        } else if (sectionId === 'reports') {
            this.updateReports();
        }
    }
    
    // Toggle between light and dark theme
    toggleTheme() {
        const newTheme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.settings.theme = newTheme;
        document.body.setAttribute('data-theme', newTheme);
        this.saveData();
    }
    
    // Add a new transaction
    addTransaction() {
        // Get form values
        const type = document.querySelector('input[name="transaction-type"]:checked').value;
        const amount = parseFloat(this.domElements.transactionAmount.value);
        const description = this.domElements.transactionDescription.value.trim();
        const category = this.domElements.transactionCategory.value;
        const date = this.domElements.transactionDate.value;
        
        // Validate inputs
        if (isNaN(amount) {
            alert('Please enter a valid amount');
            return;
        }
        
        if (description === '') {
            alert('Please enter a description');
            return;
        }
        
        // Create transaction object
        const transaction = {
            id: Date.now().toString(),
            type,
            amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
            description,
            category,
            date
        };
        
        // Add to transactions array
        this.transactions.push(transaction);
        
        // Save data
        this.saveData();
        
        // Reset form
        this.domElements.transactionForm.reset();
        this.domElements.transactionDate.value = this.formatDateForInput(new Date());
        
        // Update UI
        this.renderAll();
        
        // Show success message
        alert('Transaction added successfully!');
    }
    
    // Update transaction categories based on selected type
    updateTransactionCategories() {
        const type = document.querySelector('input[name="transaction-type"]:checked').value;
        const categorySelect = this.domElements.transactionCategory;
        
        // Clear existing options
        categorySelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a category';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        categorySelect.appendChild(defaultOption);
        
        // Add categories
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
    
    // Update budget categories select
    updateBudgetCategories() {
        const categorySelect = this.domElements.budgetCategory;
        
        // Clear existing options
        categorySelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a category';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        categorySelect.appendChild(defaultOption);
        
        // Add categories
        this.categories.forEach(category => {
            // Only add categories that don't already have a budget
            if (!this.budgets.some(b => b.category === category)) {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            }
        });
    }
    
    // Render all transactions
    renderTransactions(filteredTransactions = null) {
        const transactionsToRender = filteredTransactions || this.transactions;
        const transactionsList = filteredTransactions ? 
            this.domElements.allTransactionsList : 
            this.domElements.recentTransactionsList;
        
        // Clear existing transactions
        transactionsList.innerHTML = '';
        
        if (transactionsToRender.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No transactions found';
            transactionsList.appendChild(emptyMessage);
            return;
        }
        
        // Sort transactions by date (newest first)
        const sortedTransactions = [...transactionsToRender].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        // Limit to 10 for recent transactions
        const transactions = filteredTransactions ? 
            sortedTransactions : 
            sortedTransactions.slice(0, 10);
        
        // Create transaction items
        transactions.forEach(transaction => {
            const transactionItem = document.createElement('div');
            transactionItem.className = `transaction-item ${transaction.type}`;
            transactionItem.dataset.id = transaction.id;
            
            // Format date
            const formattedDate = this.formatDate(new Date(transaction.date));
            
            // Create icon based on category
            const icon = this.getCategoryIcon(transaction.category);
            
            transactionItem.innerHTML = `
                <div class="left">
                    <div class="icon">${icon}</div>
                    <div class="details">
                        <span class="description">${transaction.description}</span>
                        <span class="category">${transaction.category} • ${formattedDate}</span>
                    </div>
                </div>
                <div class="amount">${this.formatCurrency(transaction.amount)}</div>
            `;
            
            transactionsList.appendChild(transactionItem);
        });
    }
    
    // Filter transactions based on selected filters
    filterTransactions() {
        const type = this.domElements.transactionTypeFilter.value;
        const category = this.domElements.transactionCategoryFilter.value;
        const date = this.domElements.transactionDateFilter.value;
        
        let filteredTransactions = [...this.transactions];
        
        // Filter by type
        if (type !== 'all') {
            filteredTransactions = filteredTransactions.filter(t => t.type === type);
        }
        
        // Filter by category
        if (category !== 'all') {
            filteredTransactions = filteredTransactions.filter(t => t.category === category);
        }
        
        // Filter by date
        if (date) {
            filteredTransactions = filteredTransactions.filter(t => t.date === date);
        }
        
        // Render filtered transactions
        this.renderTransactions(filteredTransactions);
    }
    
    // Clear transaction filters
    clearTransactionFilters() {
        this.domElements.transactionTypeFilter.value = 'all';
        this.domElements.transactionCategoryFilter.value = 'all';
        this.domElements.transactionDateFilter.value = '';
        this.renderTransactions();
    }
    
    // Update dashboard with summary data
    updateDashboard() {
        const period = this.domElements.dashboardPeriod.value;
        const { income, expenses, balance } = this.calculateSummary(period);
        
        // Update summary cards
        this.domElements.incomeAmount.textContent = this.formatCurrency(income);
        this.domElements.expenseAmount.textContent = this.formatCurrency(expenses);
        this.domElements.balanceAmount.textContent = this.formatCurrency(balance);
        
        // Calculate changes (simplified - would need previous period data for real changes)
        const incomeChange = this.calculatePercentageChange('income', period);
        const expenseChange = this.calculatePercentageChange('expense', period);
        const balanceChange = this.calculatePercentageChange('balance', period);
        
        this.domElements.incomeChange.textContent = `${incomeChange >= 0 ? '+' : ''}${incomeChange}%`;
        this.domElements.expenseChange.textContent = `${expenseChange >= 0 ? '+' : ''}${expenseChange}%`;
        this.domElements.balanceChange.textContent = `${balanceChange >= 0 ? '+' : ''}${balanceChange}%`;
        
        // Update recent transactions
        this.renderTransactions();
        
        // Update spending chart
        this.updateSpendingChart(period);
    }
    
    // Calculate summary for a given period
    calculateSummary(period) {
        const now = new Date();
        let startDate;
        
        switch (period) {
            case 'day':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'week':
                // Get start of week based on settings
                const day = now.getDay();
                const diff = now.getDate() - day + (day === 0 ? -6 : this.settings.firstDayOfWeek);
                startDate = new Date(now.setDate(diff));
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(0); // All time
        }
        
        const filteredTransactions = this.transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startDate;
        });
        
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        const expenses = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        const balance = income - expenses;
        
        return { income, expenses, balance };
    }
    
    // Calculate percentage change (simplified implementation)
    calculatePercentageChange(type, period) {
        // In a real app, we would compare with previous period
        // This is just a placeholder implementation
        const current = this.calculateSummary(period);
        
        let value;
        switch (type) {
            case 'income':
                value = current.income;
                break;
            case 'expense':
                value = current.expenses;
                break;
            case 'balance':
                value = current.balance;
                break;
        }
        
        // Return a random change for demo purposes
        return Math.floor(Math.random() * 20) - 10;
    }
    
    // Initialize charts
    initCharts() {
        // Spending chart (on dashboard)
        const spendingCtx = this.domElements.spendingChart.getContext('2d');
        this.charts.spending = new Chart(spendingCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Income',
                        backgroundColor: '#4cc9f0',
                        data: []
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: '#f72585',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
        
        // Income vs Expense chart (on reports)
        const incomeVsExpenseCtx = this.domElements.incomeVsExpenseChart.getContext('2d');
        this.charts.incomeVsExpense = new Chart(incomeVsExpenseCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Income',
                        borderColor: '#4cc9f0',
                        backgroundColor: 'rgba(76, 201, 240, 0.1)',
                        fill: true,
                        data: []
                    },
                    {
                        label: 'Expenses',
                        borderColor: '#f72585',
                        backgroundColor: 'rgba(247, 37, 133, 0.1)',
                        fill: true,
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
        
        // Category distribution chart (on reports)
        const categoryDistributionCtx = this.domElements.categoryDistributionChart.getContext('2d');
        this.charts.categoryDistribution = new Chart(categoryDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#4361ee',
                        '#3f37c9',
                        '#4895ef',
                        '#4cc9f0',
                        '#43aa8b',
                        '#f8961e',
                        '#f72585'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Update spending chart
    updateSpendingChart(period) {
        // For demo purposes, we'll just show some random data
        // In a real app, we would calculate actual data based on transactions
        
        let labels;
        let incomeData;
        let expenseData;
        
        switch (period) {
            case 'day':
                labels = ['Morning', 'Afternoon', 'Evening', 'Night'];
                incomeData = labels.map(() => Math.floor(Math.random() * 500));
                expenseData = labels.map(() => Math.floor(Math.random() * 300)));
                break;
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                incomeData = labels.map(() => Math.floor(Math.random() * 1000));
                expenseData = labels.map(() => Math.floor(Math.random() * 800)));
                break;
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                incomeData = labels.map(() => Math.floor(Math.random() * 2000));
                expenseData = labels.map(() => Math.floor(Math.random() * 1500)));
                break;
            case 'year':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                incomeData = labels.map(() => Math.floor(Math.random() * 5000));
                expenseData = labels.map(() => Math.floor(Math.random() * 4000)));
                break;
        }
        
        this.charts.spending.data.labels = labels;
        this.charts.spending.data.datasets[0].data = incomeData;
        this.charts.spending.data.datasets[1].data = expenseData;
        this.charts.spending.update();
    }
    
    // Update reports
    updateReports() {
        const period = this.domElements.reportPeriod.value;
        
        // Update income vs expense chart
        this.updateIncomeVsExpenseChart(period);
        
        // Update category distribution chart
        this.updateCategoryDistributionChart(period);
    }
    
    // Update income vs expense chart
    updateIncomeVsExpenseChart(period) {
        // For demo purposes, we'll just show some random data
        // In a real app, we would calculate actual data based on transactions
        
        let labels;
        let incomeData;
        let expenseData;
        
        switch (period) {
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                incomeData = labels.map(() => Math.floor(Math.random() * 1000));
                expenseData = labels.map(() => Math.floor(Math.random() * 800)));
                break;
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                incomeData = labels.map(() => Math.floor(Math.random() * 2000));
                expenseData = labels.map(() => Math.floor(Math.random() * 1500)));
                break;
            case 'year':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                incomeData = labels.map(() => Math.floor(Math.random() * 5000));
                expenseData = labels.map(() => Math.floor(Math.random() * 4000)));
                break;
        }
        
        this.charts.incomeVsExpense.data.labels = labels;
        this.charts.incomeVsExpense.data.datasets[0].data = incomeData;
        this.charts.incomeVsExpense.data.datasets[1].data = expenseData;
        this.charts.incomeVsExpense.update();
    }
    
    // Update category distribution chart
    updateCategoryDistributionChart(period) {
        // For demo purposes, we'll just show some random data
        // In a real app, we would calculate actual data based on transactions
        
        const labels = this.categories;
        const data = labels.map(() => Math.floor(Math.random() * 1000));
        
        this.charts.categoryDistribution.data.labels = labels;
        this.charts.categoryDistribution.data.datasets[0].data = data;
        this.charts.categoryDistribution.update();
    }
    
    // Show budget modal
    showBudgetModal() {
        // Update categories in modal
        this.updateBudgetCategories();
        
        // Show modal
        this.domElements.budgetModal.classList.add('active');
    }
    
    // Hide budget modal
    hideBudgetModal() {
        this.domElements.budgetModal.classList.remove('active');
    }
    
    // Add a new budget
    addBudget() {
        const category = this.domElements.budgetCategory.value;
        const amount = parseFloat(this.domElements.budgetAmount.value);
        const period = this.domElements.budgetPeriod.value;
        
        // Validate inputs
        if (!category) {
            alert('Please select a category');
            return;
        }
        
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Create budget object
        const budget = {
            id: Date.now().toString(),
            category,
            amount,
            period
        };
        
        // Add to budgets array
        this.budgets.push(budget);
        
        // Save data
        this.saveData();
        
        // Reset form
        this.domElements.budgetForm.reset();
        
        // Hide modal
        this.hideBudgetModal();
        
        // Update UI
        this.renderBudgets();
        
        // Show success message
        alert('Budget added successfully!');
    }
    
    // Render all budgets
    renderBudgets() {
        const budgetsList = this.domElements.budgetsList;
        const budgetProgressChart = this.domElements.budgetProgressChart;
        
        // Clear existing budgets
        budgetsList.innerHTML = '';
        budgetProgressChart.innerHTML = '';
        
        if (this.budgets.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No budgets set up yet';
            budgetsList.appendChild(emptyMessage);
            return;
        }
        
        // Create budget items
        this.budgets.forEach(budget => {
            const budgetItem = document.createElement('div');
            budgetItem.className = 'budget-item';
            budgetItem.dataset.id = budget.id;
            
            // Calculate spent amount for this budget
            const spent = this.calculateSpentForBudget(budget);
            const percent = Math.min((spent / budget.amount) * 100, 100);
            
            budgetItem.innerHTML = `
                <div class="budget-item-header">
                    <span class="budget-item-title">${budget.category}</span>
                    <span class="budget-item-amount">${this.formatCurrency(budget.amount)}</span>
                </div>
                <div class="budget-item-period">${budget.period === 'weekly' ? 'Weekly' : 'Monthly'} Budget</div>
                <div class="budget-progress">
                    <div class="budget-progress-bar" style="width: ${percent}%"></div>
                </div>
                <div class="budget-progress-info">
                    <span>${this.formatCurrency(spent)} spent</span>
                    <span class="budget-progress-percent">${percent.toFixed(1)}%</span>
                </div>
            `;
            
            budgetsList.appendChild(budgetItem);
            
            // Add to progress chart
            const progressItem = document.createElement('div');
            progressItem.className = 'budget-progress-item';
            progressItem.innerHTML = `
                <div class="budget-progress-label">${budget.category}</div>
                <div class="budget-progress-bar-container">
                    <div class="budget-progress-bar" style="width: ${percent}%"></div>
                </div>
                <div class="budget-progress-amount">${this.formatCurrency(spent)} / ${this.formatCurrency(budget.amount)}</div>
            `;
            
            budgetProgressChart.appendChild(progressItem);
        });
    }
    
    // Calculate spent amount for a budget
    calculateSpentForBudget(budget) {
        const now = new Date();
        let startDate;
        
        if (budget.period === 'weekly') {
            // Get start of week based on settings
            const day = now.getDay();
            const diff = now.getDate() - day + (day === 0 ? -6 : this.settings.firstDayOfWeek);
            startDate = new Date(now.setDate(diff));
        } else {
            // Monthly
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        
        const filteredTransactions = this.transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startDate && 
                   t.type === 'expense' && 
                   t.category === budget.category;
        });
        
        return filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    }
    
    // Add a new category
    addNewCategory() {
        const categoryName = this.domElements.newCategory.value.trim();
        
        if (!categoryName) {
            alert('Please enter a category name');
            return;
        }
        
        if (this.categories.includes(categoryName)) {
            alert('This category already exists');
            return;
        }
        
        // Add to categories array
        this.categories.push(categoryName);
        
        // Save data
        this.saveData();
        
        // Clear input
        this.domElements.newCategory.value = '';
        
        // Update UI
        this.updateTransactionCategories();
        this.renderCategoriesList();
        
        // Show success message
        alert('Category added successfully!');
    }
    
    // Remove a category
    removeCategory(categoryName) {
        // Confirm removal
        this.showConfirmModal(
            'Remove Category',
            `Are you sure you want to remove the category "${categoryName}"? Transactions in this category will not be deleted but will be marked as "Other".`,
            () => {
                // Remove category
                this.categories = this.categories.filter(c => c !== categoryName);
                
                // Update transactions with this category to "Other"
                this.transactions.forEach(t => {
                    if (t.category === categoryName) {
                        t.category = 'Other';
                    }
                });
                
                // Remove budgets for this category
                this.budgets = this.budgets.filter(b => b.category !== categoryName);
                
                // Save data
                this.saveData();
                
                // Update UI
                this.updateTransactionCategories();
                this.updateBudgetCategories();
                this.renderCategoriesList();
                this.renderAll();
                
                // Show success message
                alert('Category removed successfully!');
            }
        );
    }
    
    // Render categories list
    renderCategoriesList() {
        const categoriesList = this.domElements.categoriesList;
        
        // Clear existing categories
        categoriesList.innerHTML = '';
        
        // Add categories
        this.categories.forEach(category => {
            const categoryTag = document.createElement('div');
            categoryTag.className = 'category-tag';
            
            categoryTag.innerHTML = `
                <span>${category}</span>
                <button class="remove-category" data-category="${category}">×</button>
            `;
            
            // Add event listener to remove button
            const removeBtn = categoryTag.querySelector('.remove-category');
            removeBtn.addEventListener('click', () => this.removeCategory(category));
            
            categoriesList.appendChild(categoryTag);
        });
    }
    
    // Save settings
    saveSettings() {
        this.settings.currency = this.domElements.currencySelect.value;
        this.settings.firstDayOfWeek = parseInt(this.domElements.firstDayOfWeek.value);
        
        // Save data
        this.saveData();
        
        // Update UI
        this.renderAll();
        
        // Show success message
        alert('Settings saved successfully!');
    }
    
    // Reset settings to defaults
    resetSettings() {
        this.settings = {
            currency: '$',
            firstDayOfWeek: 1,
            theme: 'light'
        };
        
        // Save data
        this.saveData();
        
        // Update UI
        this.initUI();
        this.renderAll();
        
        // Show success message
        alert('Settings reset to defaults!');
    }
    
    // Export data as JSON file
    exportData() {
        const data = {
            transactions: this.transactions,
            budgets: this.budgets,
            categories: this.categories,
            settings: this.settings
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `expense-tracker-data-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Import data from JSON file
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validate data structure
                if (!data.transactions || !data.budgets || !data.categories || !data.settings) {
                    throw new Error('Invalid data format');
                }
                
                // Confirm import
                this.showConfirmModal(
                    'Import Data',
                    'This will replace all your current data. Are you sure you want to continue?',
                    () => {
                        // Import data
                        this.transactions = data.transactions;
                        this.budgets = data.budgets;
                        this.categories = data.categories;
                        this.settings = data.settings;
                        
                        // Save data
                        this.saveData();
                        
                        // Update UI
                        this.initUI();
                        this.renderAll();
                        
                        // Show success message
                        alert('Data imported successfully!');
                    }
                );
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }
    
    // Clear all data
    clearAllData() {
        this.transactions = [];
        this.budgets = [];
        this.categories = ['Food', 'Transport', 'Entertainment', 'Home', 'Health', 'Education', 'Other'];
        this.settings = {
            currency: '$',
            firstDayOfWeek: 1,
            theme: 'light'
        };
        
        // Save data
        this.saveData();
        
        // Update UI
        this.initUI();
        this.renderAll();
        
        // Show success message
        alert('All data has been cleared!');
    }
    
    // Show confirmation modal
    showConfirmModal(title, message, callback) {
        this.domElements.confirmTitle.textContent = title;
        this.domElements.confirmMessage.textContent = message;
        this.confirmCallback = callback;
        this.domElements.confirmModal.classList.add('active');
    }
    
    // Hide confirmation modal
    hideConfirmModal() {
        this.domElements.confirmModal.classList.remove('active');
        this.confirmCallback = null;
    }
    
    // Format currency based on settings
    formatCurrency(amount) {
        return `${this.settings.currency}${Math.abs(amount).toFixed(2)}`;
    }
    
    // Format date for display
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Format date for input field
    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Get icon for category
    getCategoryIcon(category) {
        const icons = {
            'Food': '🍔',
            'Transport': '🚗',
            'Entertainment': '🎬',
            'Home': '🏠',
            'Health': '🏥',
            'Education': '📚',
            'Other': '📦'
        };
        
        return icons[category] || '💰';
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Chart.js from CDN if not already loaded
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            new ExpenseTracker();
        };
        document.head.appendChild(script);
    } else {
        new ExpenseTracker();
    }
});