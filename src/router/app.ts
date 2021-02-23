import { Router } from 'opine'

export const appRoutes = Router({
  caseSensitive: true
}).get('/', async (_, res) => {
  const decoder = new TextDecoder('utf-8')
  try {
    const data = await Deno.readFile('public/index.html')
    res.send(decoder.decode(data))
  } catch (e) {
    res.send('Error')
  }
})
