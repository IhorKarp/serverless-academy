const originalData = [
  {
    _id: "617660a44c4250001275c807",
    user: { name: "Ralph Poole", _id: "5fff07b70c6f5f594b03d54c" },
    usedDays: 1,
    endDate: "2021-11-02",
    startDate: "2021-11-02",
  },
  {
    _id: "6177b1884c4250001275d6f8",
    user: { name: "Keiran Haney", _id: "5f57b9b3b642eb0017808882" },
    usedDays: 5,
    endDate: "2021-11-19",
    startDate: "2021-11-15",
  },
  {
    _id: "61823e97ac15350011f7fcea",
    user: { name: "Tahlia Kelly", _id: "602291efca744a001259baee" },
    usedDays: 2,
    endDate: "2021-11-05",
    startDate: "2021-11-04",
  },
  {
    _id: "618d2e6eac15350011f833eb",
    user: { name: "Edna Ramsey", _id: "602666c98465030011abd896" },
    usedDays: 10,
    endDate: "2021-12-10",
    startDate: "2021-11-29",
  },
  {
    _id: "619394943a8533001285e7fb",
    user: { name: "Gloria Winter", _id: "603e4a14b2ab3400117a2bd4" },
    usedDays: 1,
    endDate: "2021-11-22",
    startDate: "2021-11-22",
  },
  {
    _id: "619434303a8533001285f100",
    user: { name: "Conrad Boyd", _id: "5f57b892b642eb0017808876" },
    usedDays: 1,
    endDate: "2021-11-22",
    startDate: "2021-11-22",
    status: "approved",
  },
  {
    _id: "619602f13a8533001285fb95",
    user: { name: "Clementine Maddox", _id: "5fff08fc0c6f5f594b03d54d" },
    usedDays: 3,
    endDate: "2021-12-05",
    startDate: "2021-12-01",
  },
  {
    _id: "6196a33a3a853300128602eb",
    user: { name: "Gracie Joyce", _id: "602671015fe2cc0011b9f989" },
    usedDays: 3,
    endDate: "2021-11-23",
    startDate: "2021-11-19",
  },
  {
    _id: "61a3c3bb3a85330012864b5b",
    user: { name: "Homer Siers", _id: "60b7c1f04df06a0011ef0e76" },
    usedDays: 2,
    endDate: "2021-12-10",
    startDate: "2021-12-09",
  },
  {
    _id: "61a63af23a853300128672fa",
    user: { name: "Willie Turner", _id: "60be18161af932001237584b" },
    usedDays: 1,
    endDate: "2021-12-01",
    startDate: "2021-12-01",
    status: "approved",
  },
  {
    _id: "61b11cfc3a8533001286e862",
    user: { name: "Gabriel Savage", _id: "604e26d9aed6010012a038f1" },
    usedDays: 1,
    endDate: "2021-12-10",
    startDate: "2021-12-10",
    status: "approved",
  },
  {
    _id: "61b36ff43a853300128734fb",
    user: { name: "Freddie Roman", _id: "60c331ff1f37230011191058" },
    usedDays: 1,
    endDate: "2021-12-14",
    startDate: "2021-12-14",
  },
  {
    _id: "61b3700b3a85330012873568",
    user: { name: "Aron Hansen", _id: "6113c7e519e5740011288e40" },
    usedDays: 1,
    endDate: "2021-12-14",
    startDate: "2021-12-14",
    status: "approved",
  },
  {
    _id: "61b653863a853300128767a0",
    user: { name: "Tahlia Kelly", _id: "602291efca744a001259baee" },
    usedDays: 1,
    endDate: "2021-12-13",
    startDate: "2021-12-13",
    status: "approved",
  },
  {
    _id: "6196a33a3a853300128602eb",
    user: { name: "Gracie Joyce", _id: "602671015fe2cc0011b9f989" },
    usedDays: 3,
    endDate: "2021-12-12",
    startDate: "2021-12-10",
  },
  {
    _id: "61b36ff43a853300128734fb",
    user: { name: "Freddie Roman", _id: "60c331ff1f37230011191058" },
    usedDays: 1,
    endDate: "2021-12-14",
    startDate: "2021-12-14",
  },
  {
    _id: "619434303a8533001285f100",
    user: { name: "Conrad Boyd", _id: "5f57b892b642eb0017808876" },
    usedDays: 3,
    endDate: "2021-10-22",
    startDate: "2021-10-20",
    status: "approved",
  },
  {
    _id: "619434303a8533001285f100",
    user: { name: "Conrad Boyd", _id: "5f57b892b642eb0017808876" },
    usedDays: 1,
    endDate: "2021-12-01",
    startDate: "2021-12-01",
    status: "approved",
  },
];


// Use reduce method to transform the original data array into a new array
const transformedData = originalData.reduce((acc, curr) => {
    // Check if the user already exists in the accumulator array
    const existingUser = acc.find((user) => user.userId === curr.user._id);
  
    if (existingUser) {
        // If user already exists, add vacation to their existing vacations array
        existingUser.vacations.push({
            startDate: curr.startDate,
            endDate: curr.endDate
        });
    } else {
        // If user does not exist, create a new user object with the user's name, id and an array of vacations
        acc.push({
            userId: curr.user._id,
            userName: curr.user.name,
            vacations: [
                {
                    startDate: curr.startDate,
                    endDate: curr.endDate
                }
            ]
        });
    }
  
    return acc;
}, []);


console.log(JSON.stringify(transformedData, null, 2));
