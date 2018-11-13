const express = require('express');
const app = express();
const port = 5000;

app.get('/api/customers', (req, res) => {
        const customers = [
                {id: 1, firstName: 'John', lastName: 'Doe'},
                {id: 2, firstName: 'Jane', lastName: 'Doe'},
                {id: 3, firstName: 'Mary', lastName: 'Doe'}
        ]
        res.json(customers);
});

app.listen(port, console.log(`The Recipe App is running on port ${port}`)
);