'use strict'

const NotesDAL = require('./notesDAL')
const noteSchema = require('./schemas')

module.exports = async function (fastify, opts) {
  const notesDAL = NotesDAL(fastify.db)

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Notes'],
      description: 'Get all notes.',
      response: {
        200: {
          type: 'array',
          items: noteSchema
        }
      }
    },
    handler: async (request, reply) => notesDAL.getNotes()
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Notes'],
      description: 'Create a note.',
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string', description: 'Content of the Note' }
        }
      },
      response: {
        201: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { title, body } = request.body

      const newNote = await notesDAL.createNote(title, body)

      reply.status(201).send(newNote)
    }
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Notes'],
      description: 'Edit a note.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        }
      },
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string', description: 'Content of the Note' }
        }
      },
      response: {
        200: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { title, body } = request.body

      return notesDAL.updateNote(request.params.id, title, body)
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Notes'],
      description: 'Delete a note. WARNING! it\'s a permanent deletion.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
        }
      },
      response: {
        204: {
          type: 'string',
          default: 'No content'
        }
      }
    },
    handler: async (request, reply) => {
      await notesDAL.deleteNote(request.params.id)
      reply.status(204)
    }
  })
}
