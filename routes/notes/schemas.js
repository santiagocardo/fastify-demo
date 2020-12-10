'use strict'

const noteSchema = {
  type: 'object',
  required: ['id', 'title', 'body'],
  properties: {
    id: { type: 'number', description: 'Unique identifier for a Note' },
    title: { type: 'string' },
    body: { type: 'string', description: 'Content of the Note' }
  }
}

module.exports = noteSchema
