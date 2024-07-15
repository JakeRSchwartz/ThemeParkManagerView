import { urlencoded, json } from 'express'
export { urlencoded, json }
import session  from 'express-session'
export { session } 

export async function CreateServer () {
  return import('express')
}

export async function initializeServer () {
  try {
    const express = await CreateServer()
    return express.default() // Since import returns a promise, you might need to access the default export
  } catch (error) {
    console.error('Failed to initialize Express server:', error)
    throw error // Re-throw the error to handle it at the caller's level
  }
}

export async function createRouter () {
  try {
    const { default: express } = await import('express')
    const router = express.Router()
    return router
  } catch (error) {
    console.error('Failed to import express:', error)
    throw error
  }
}
