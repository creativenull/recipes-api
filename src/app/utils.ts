import { customAlphabet } from 'nanoid'

function uuid (): string {
  return customAlphabet('1234567890qwertyuiopasdfghjklzxcvbnm', 10)()
}

export default uuid
