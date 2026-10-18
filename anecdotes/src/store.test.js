import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdotesActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('display anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'A', votes: 0 },
      { id: 2, content: 'B', votes: 2 },
      { id: 3, content: 'C', votes: 4 },
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdotesActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toMatchObject([
      { id: 3, content: 'C', votes: 4 },
      { id: 2, content: 'B', votes: 2 },
      { id: 1, content: 'A', votes: 0 },
    ])
  })

  it('display anecdotes filtered by given value', async () => {
    useAnecdoteStore.setState({ anecdotes: [
      { id: 1, content: 'Apple Banana Carrot', votes: 0 },
      { id: 2, content: 'Apple Carrot Donkey', votes: 2 },
      { id: 3, content: 'Banana Carrot Donkey', votes: 4 },
    ], filter: ''})

    const { result } = renderHook(() => useAnecdotesActions())
    await act(async () => {
      await result.current.setFilter('Apple')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toMatchObject([
      { id: 2, content: 'Apple Carrot Donkey', votes: 2 },
      { id: 1, content: 'Apple Banana Carrot', votes: 0 },
    ])
  })
})
