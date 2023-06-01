import { getLatestDateFormatted } from '@/utils/getAvailableDates'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
  
    try {
        if(!req.query.path) {
            // This should be the actual path not a rewritten path
            // e.g. for "/blog/[slug]" this should be "/blog/post-1"
            // this is revalidating the homepage
            await res.revalidate('/');
            // this is revalidating the most recent page
            const date = getLatestDateFormatted()
            await res.revalidate(`/${date}`)
            return res.json({ revalidated: true })
        } else {
            await res.revalidate(`/${req.query.path}`)
            return res.json({ revalidated: true })
        }
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}
