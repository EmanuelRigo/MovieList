import type { NextApiRequest, NextApiResponse } from 'next';
import envsUtils from "@/utils/envs.utils.js"; // 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${envsUtils.API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching movie data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}