import {
  findRecordByFilter,
  getFormattedRecords,
  table,
} from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + 1;
          const updateStores = await table.update([
            {
              id: record.record_id,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);
          if (updateStores) {
            const coffeeStores = getFormattedRecords(updateStores);
            res.json(coffeeStores);
          }
        } else {
          res.json({ message: "Coffee store id doesn't exists", id });
        }
      } else {
        res.json({ message: "id is missing" });
      }
    } catch (e) {
      console.error(e);
      res.status(500);
      res.json({ message: "Error updating store", e });
    }
  }
};

export default favouriteCoffeeStoreById;
