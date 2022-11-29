import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('Ev-Charging');
    console.log('req', req);
    const { id } = req.query;
    console.log('req.body', req.body);
    const { date, mileage, kwh, pricePerKwh, chargerLocation, network, chargeCost } = req.body;

    const post = await db.collection('Charges').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          date,
          mileage,
          kwh,
          pricePerKwh,
          chargerLocation,
          network,
          chargeCost,
        },
      },
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
