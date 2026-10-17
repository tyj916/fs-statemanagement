
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updatedAnecdote = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({ 
        anecdotes: state.anecdotes.map(anecdote => 
          anecdote.id === id ? updatedAnecdote : anecdote
        )
      }))
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },
    setFilter: value => set({ filter: value}),
    clearZeroVotes: async () => {
      // if votes equals zero, push to zeroVotes, else push to others
      const [zeroVotes, others] = get().anecdotes.reduce((acc, anecdote) => {
        if (anecdote.votes === 0) {
          acc[0].push(anecdote)
        } else {
          acc[1].push(anecdote)
        }

        return acc
      }, [[], []])
      const promiseArray = zeroVotes.map(async (anecdote) => await anecdoteService.remove(anecdote.id))
      await Promise.all(promiseArray)
      set(() => ({ anecdotes: others }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  ).toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdotesActions = () => useAnecdoteStore(state => state.actions)
