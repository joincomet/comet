import 'reflect-metadata'
import checkEnv from '@/util/checkEnv'
import { bootstrap } from '@/bootstrap'

checkEnv()
bootstrap().catch(console.error)
