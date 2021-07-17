import { Router } from 'oak'
import { graphqlRouter } from './gql/index.ts'

const router = new Router()

router.post('/graphql', graphqlRouter)

export default router
