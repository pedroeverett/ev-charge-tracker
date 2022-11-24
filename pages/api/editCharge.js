import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('Ev-Charging');
    const { id } = req.query;
    const { title, content } = req.body;

    const post = await db.collection('Charges').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title,
          content,
        },
      },
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
