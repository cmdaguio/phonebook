const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

  let persons = [
    {
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const date = new Date();
  const entries = persons.length;
  const body = 
   `<p>Phonebook has info for ${entries} people</p>
    <p>${date}</p>`;
  response.send(body);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  
  if (!person) {
    response.status(400).json({error: 'person not found'});
  } else {
    response.json(person);
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  
  response.status(204).end();
});

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000);
};
   
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    response.json({error: 'name or number is missing'});
  }
  if (persons.find(person => person.name === body.name)) {
    response.json({error: 'name must be unique'});
  } else {
    const person = {
      id: generateRandomId(),
      name: body.name,
      number: body.number
    };

    persons = persons.concat(person);
    response.json(person);
  }
});
  
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  `Server running at port ${PORT}`
});
