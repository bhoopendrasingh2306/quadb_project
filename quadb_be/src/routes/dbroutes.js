const express = require("express");
const router = express.Router();
const axios = require("axios");
const con = require("../db/config");


// this api is for adding data to the database manually
router.post("/postdata", (req, resp) => {
  const { name, last, buy, sell, volume, base_unit } = req.body;
  const insert_query =
    "INSERT INTO quadb_table(name , last , buy , sell , volume, base_unit) VALUES ($1,$2,$3,$4,$5,$6)";
  con.query(
    insert_query,
    [name, last, buy, sell, volume, base_unit],
    (err, result) => {
      if (err) {
        resp.send(err);
      } else {
        console.log(result);
        resp.send("Data Inserted Successfully");
      }
    }
  );
});


// this api is for getting the data from the database
router.get("/getdata", (req, resp) => {
  const apidata = "Select * from quadb_table";
  con.query(apidata, (err, result) => {
    if (err) {
      resp.send(err);
    } else {
      console.log(result.rows);
      resp.send(result.rows);
    }
  });
});


//this api is for fetching the data from the third party api and posting it to the database

//http://localhost:5000/dbroutes/apidata
router.post("/apidata", async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const result = Object.keys(response.data).map((key) => [
      key,
      response.data[key],
    ]);

    // Limit the number of records to be processed
    const arr = result.slice(0, 10);

    // Prepare insert queries
    const insertPromises = arr.map(async (item) => {
      const datatobeinserted = {
        name: item[1].name,
        last: item[1].last,
        buy: item[1].buy,
        sell: item[1].sell,
        volume: item[1].volume,
        base_unit: item[1].base_unit,
      };

      const query = `
        INSERT INTO quadb_table(name, last, buy, sell, volume, base_unit)
        VALUES($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        datatobeinserted.name,
        datatobeinserted.last,
        datatobeinserted.buy,
        datatobeinserted.sell,
        datatobeinserted.volume,
        datatobeinserted.base_unit,
      ];

      return con.query(query, values);
    });

    // Execute all insert operations
    await Promise.all(insertPromises);

    // Send success response
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error fetching or inserting data:", error);
    res.status(500).json({ error: "Failed to fetch or insert data" });
  }
});

module.exports = router;
