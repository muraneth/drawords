export const mySchema = {
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100, // <- the primary key must have set maxLength
    },
    name: {
      type: "string",
    },
    count: {
      type: "number",
    },
    timestamp: {
      type: "date-time",
    },
  },
  required: ["id", "name", "count", "timestamp"],
};
