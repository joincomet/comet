import React from 'react'
// @ts-ignore
import RDS from 'react-dom/server'
import Avataaars from 'avataaars'

const AvataaarComponent = React.createFactory(Avataaars)

export const avataaarEndpoint = async (req: any, res: any) => {
  const options = { ...req.query }
  const appString = RDS.renderToString(AvataaarComponent(options))

  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'max-age=31536000'
  })
  res.end(appString)
}
