const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const getFormattedRecords = (records) => {
  return records.map((record) => {
    return {
      record_id: record.id,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id) => {
  const findCoffeeStores = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getFormattedRecords(findCoffeeStores);
};

export { table, getFormattedRecords, findRecordByFilter };
