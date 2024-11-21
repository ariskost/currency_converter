const fs = require('fs');
const path = require('path');
const currenciesPath = path.join(__dirname, '../currencies.json');

const readCurrencies = () => {
    const data = fs.readFileSync(currenciesPath);
    return JSON.parse(data);
};

const writeCurrencies = (data) => {
    fs.writeFileSync(currenciesPath, JSON.stringify(data, null, 2));
};

// Get all Currencies
exports.getRates = (request, response) => {
    const currencies = readCurrencies();
    response.json(currencies);
};

// Add
exports.addRate = (request, response) => {
    const { base, baseFullName, target, targetFullName, rate } = request.body;

    if (!base || !baseFullName || !target || !targetFullName || !rate) {
        return response.status(400).json({ error: 'All fields are required' });
    }

    const currencies = readCurrencies();
    currencies.push({ base, baseFullName, target, targetFullName, rate });
    writeCurrencies(currencies);

    response.status(201).json({ message: 'Rate added successfully' });
};

// Update
exports.updateRate = (request, response) => {
    const { base, target } = request.body;

    if (!base || !target) {
        return response.status(400).json({ error: 'Base and target are required for updating a rate' });
    }

    const currencies = readCurrencies();
    const index = currencies.findIndex((r) => r.base === base && r.target === target);

    if (index === -1) {
        return response.status(404).json({ error: 'Rate not found' });
    }

    const updatedRate = {
        ...currencies[index],
        ...request.body, // Merge with incoming data
    };

    currencies[index] = updatedRate; // Replace the old rate with the updated one
    writeCurrencies(currencies);

    response.json({ message: 'Rate updated successfully' });
};


// Delete
exports.deleteRate = (request, response) => {
    const { base, baseFullName, target, targetFullName, rate } = request.body;

    let currencies = readCurrencies();
    const initialLength = currencies.length;
    currencies = currencies.filter((r) => !(r.base === base && r.baseFullName === baseFullName && r.target === target && r.targetFullName === targetFullName));

    if (currencies.length === initialLength) {
        return response.status(404).json({ error: 'Rate not found' });
    }

    writeCurrencies(currencies);
    response.json({ message: 'Rate deleted successfully' });
};

// Convert Currency
exports.convertCurrency = (request, response) => {
    const { base, target, amount } = request.body;

    const currencies = readCurrencies();
    const rate = currencies.find((r) => r.base === base && r.target === target);

    if (!rate) {
        return response.status(404).json({ error: 'Rate not found' });
    }

    const convertedAmount = amount * rate.rate;
    response.json({ convertedAmount });
};
