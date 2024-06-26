import 'dotenv/config'
import { z } from 'zod'

const environmentVariablesSchema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
})

const _env = environmentVariablesSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ INVALID ENVIRONMENT VARIABLES', _env.error.format())
  throw new Error('Invalid environment variables')
}

export default _env.data
