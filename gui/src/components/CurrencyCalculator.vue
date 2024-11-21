<template>
    <div class="converter-container">
        <h2>Currency Converter</h2>

        <!-- Currency Conversion Form -->
        <form @submit.prevent="convertCurrency" class="converter-form">
            <div class="inline-container">
                <div class="select-group">
                    <label for="base-select">Base:</label>
                    <select id="base-select" v-model="selectedBase" class="select-field" @change="filterTargets">
                        <option value="" disabled>Select base currency</option>
                        <option v-for="currency in uniqueBases" :key="currency.base" :value="currency.base">
                            {{ currency.base }} - {{ currency.baseFullName }}
                        </option>
                    </select>
                </div>

                <div class="select-group">
                    <label for="target-select">Target:</label>
                    <select id="target-select" v-model="selectedTarget" class="select-field" :disabled="!selectedBase">
                        <option value="" disabled>Select target currency</option>
                        <option v-for="currency in filteredTargets" :key="currency.target" :value="currency.target">
                            {{ currency.target }} - {{ currency.targetFullName }}
                        </option>
                    </select>
                </div>
            </div>

            <input v-model.number="amount" type="number" placeholder="Amount" class="input-field" required />
            
            <button type="submit" class="primary-button" :disabled="!selectedBase || !selectedTarget || !amount">
                Convert
            </button>
        </form>

        <p v-if="result" class="result-message">Converted Amount: {{ result }}</p>

        <!-- Currencies Table -->
        <div class="table-container">
            <div class="table-header">
                <h3>Currencies</h3>
                <button @click="showAddCurrencyModal = true" class="add-button">
                    <span>+</span> Add Currency
                </button>
            </div>

            <!-- Search and Pagination -->
            <div class="table-controls">
                <input v-model="searchQuery" type="text" placeholder="Search currencies..." class="search-field"/>
                <div class="pagination-control">
                    <label for="rows-per-page">Rows per page:</label>
                    <select id="rows-per-page" v-model.number="rowsPerPage" class="pagination-select">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option :value="currencies.length">All</option>
                    </select>
                </div>
            </div>

            <table class="currencies-table">
                <thead>
                    <tr>
                        <th>Base</th>
                        <th>Base Full Name</th>
                        <th>Target</th>
                        <th>Target Full Name</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(currency, index) in paginatedCurrencies" :key="index">

                        <td>{{ currency.base }}</td>
                        <td>{{ currency.baseFullName }}</td>
                        <td>{{ currency.target }}</td>
                        <td>{{ currency.targetFullName }}</td>
                        <td>{{ currency.rate }}</td>
                        <td>
                            <button @click="editCurrency(index)" class="edit-button">
                                Edit
                            </button>
                            <button @click="deleteCurrency(index)" class="delete-button">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Pagination -->
            <div class="pagination-links">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{ 'active-page': currentPage === page }" class="pagination-button">
                    {{ page }}
                </button>
            </div>
        </div>

        <!-- Currency Modal ( Add/Edit ) -->
        <div v-if="showAddCurrencyModal || editIndex !== null" class="modal-overlay">
            <div class="modal">
                <h3>{{ editIndex === null ? 'Add Currency' : 'Edit Currency' }}</h3>
                <form @submit.prevent="saveCurrency">
                    <input v-model="newCurrency.base" placeholder="Base Currency" class="input-field" required />
                    <input v-model="newCurrency.baseFullName" placeholder="Base Currency Full Name" class="input-field" required />
                    <input v-model="newCurrency.target" placeholder="Target Currency" class="input-field" required />
                    <input v-model="newCurrency.targetFullName" placeholder="Target Currency Full Name" class="input-field" required />
                    <input v-model.number="newCurrency.rate" type="number" step="0.000000000000001" placeholder="Rate" class="input-field" required />
                    <div class="modal-buttons">
                        <button type="submit" class="primary-button">Save</button>
                        <button type="button" @click="closeModal" class="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

const baseURL = process.env.APP_API_BASE_URL || 'http://localhost:5000';

export default {
    data() {
        return {
            selectedBase: null,
            selectedTarget: null,
            amount: null,
            result: null,
            currencies: [],
            filteredTargets: [],
            searchQuery: '',
            rowsPerPage: 10,
            currentPage: 1,
            newCurrency: {
                base: '',
                baseFullName: '',
                target: '',
                targetFullName: '',
                rate: null,
            },
            showAddCurrencyModal: false,
            editIndex: null,
        };
    },
    computed: {
        uniqueBases() {
            const uniqueBases = [];
            this.currencies.forEach((currency) => {
                if (!uniqueBases.some((b) => b.base === currency.base)) {
                    uniqueBases.push({
                        base: currency.base,
                        baseFullName: currency.baseFullName,
                    });
                }
            });
            return uniqueBases;
        },
        filteredCurrencies() {
            const query = this.searchQuery.toLowerCase();
            return this.currencies.filter(
                (currency) =>
                    currency.base.toLowerCase().includes(query) ||
                    currency.baseFullName.toLowerCase().includes(query) ||
                    currency.target.toLowerCase().includes(query) ||
                    currency.targetFullName.toLowerCase().includes(query) ||
                    currency.rate.toString().includes(query)
            );
        },
        paginatedCurrencies() {
            const start = (this.currentPage - 1) * this.rowsPerPage;
            const end = start + this.rowsPerPage;
            return this.filteredCurrencies.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredCurrencies.length / this.rowsPerPage) || 1;
        },
    },
    watch: {
        rowsPerPage() {
            this.currentPage = 1;
        },
    },
    mounted() {
        this.fetchCurrencies();
    },
    methods: {
        async fetchCurrencies() {
            try {
                const response = await axios.get(`${baseURL}/api/currencies`);
                this.currencies = response.data;
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        },
        filterTargets() {
            if (this.selectedBase) {
                this.filteredTargets = this.currencies
                    .filter((currency) => currency.base === this.selectedBase)
                    .map((currency) => ({
                        target: currency.target,
                        targetFullName: currency.targetFullName,
                    }));
            } else {
                this.filteredTargets = [];
            }
            this.selectedTarget = null;
        },
        async convertCurrency() {
            try {
                const response = await axios.post(`${baseURL}/api/currencies/convert`, {
                    base: this.selectedBase,
                    target: this.selectedTarget,
                    amount: this.amount,
                });
                this.result = response.data.convertedAmount;
            } catch (error) {
                console.error('Conversion error:', error);
                this.result = null;
            }
        },
        async deleteCurrency(index) {
            const currency = this.paginatedCurrencies[index];
            const token = localStorage.getItem('token'); // Token for authentication
            
            if (!token) {
                console.error('No token found. Access denied.');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`, // Token to Request
            };

            try {
                await axios.delete(`${baseURL}/api/currencies`, {
                    data: {
                        base: currency.base, 
                        baseFullName: currency.baseFullName, 
                        target: currency.target, 
                        targetFullName: currency.targetFullName,
                    },
                    headers,
                });
                
                const deleteIndex = this.currencies.findIndex(
                    (item) => item.base === currency.base && item.target === currency.target
                );

                if (deleteIndex !== -1) {
                    this.currencies.splice(deleteIndex, 1);
                }

                this.filterTargets();

                if (this.paginatedCurrencies.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
            } catch (error) {
                console.error('Error deleting currency:', error.response?.data || error.message);
            }
        },
        editCurrency(index) {
            const selectedCurrency = this.paginatedCurrencies[index];
            this.newCurrency = { ...selectedCurrency };
            this.editIndex = index;
            this.showAddCurrencyModal = true;
        },
        async saveCurrency() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Access denied.');
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                if (this.editIndex === null) {
                    await axios.post(
                        `${baseURL}/api/currencies`,
                        this.newCurrency,
                        { headers }
                    );
                } else {
                    await axios.put(
                        `${baseURL}/api/currencies`,
                        this.newCurrency,
                        { headers }
                    );
                }
                this.fetchCurrencies(); // Refresh table
            } catch (error) {
                console.error('Error saving currency:', error.response?.data || error.message);
            } finally {
                this.closeModal();
            }
        },
        closeModal() {
            this.showAddCurrencyModal = false;
            this.newCurrency = {
                base: '',
                baseFullName: '',
                target: '',
                targetFullName: '',
                rate: null,
            };
            this.editIndex = null;
        },
    },
};


</script>

