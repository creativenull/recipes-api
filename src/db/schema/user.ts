import { getDbInstance } from '../index.ts'
import { User } from '../../app/models/user.ts'

export interface UserSchema extends User {
  _id: { $oid: string }
}

const db = await getDbInstance()
export const userCollection = db.collection<UserSchema>('users')
