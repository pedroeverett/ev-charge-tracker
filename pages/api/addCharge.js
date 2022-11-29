import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('Ev-Charging');
    const post = await db.collection('Charges').insertOne(req.body);

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
