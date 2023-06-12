// const express = require("express");
// const router = express.Router();

// const fetchDiscover = async (number) => {
//   const response = await fetch(
//     "https://api.jikan.moe/v4/manga?order_by=popularity"
//   );
//   const data = await response.json();

//   return data.data.filter((item) => item.popularity <= number);
// };

// const fetchTop = async (number) => {
//   const response = await fetch("https://api.jikan.moe/v4/top/manga");
//   const data = await response.json();

//   return data.data.filter((item) => item.rank <= number);
// };

// router.get("/", async (req, res, next) => {
//   const filteredDiscoverData = await fetchDiscover(5);
//   const filteredTopData = await fetchTop(5);
//   //   console.log(data.data);
//   res.status(200).json({
//     message: "successfully fetched popular manga",
//     popular: filteredDiscoverData,
//     top: filteredTopData,
//   });
// });

// router.get("/:id", async (req, res, next) => {
//     const mal_id= req.params.id
//     const response = await fetch(`https://api.jikan.moe/v4/manga/${mal_id}`);
//     const data = await response.json();
//        res.status(200).json({
//         message:"successfully fetched manga",manga:data.data
//        })
// })


// module.exports = router;
