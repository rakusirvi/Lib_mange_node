const { userModel, bookModel } = require("../models/index");

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No user's in DB",
    });
  }

  res.status(200).json({
    success: true,
    message: "User's are Found",
    data: users,
  });
};

// app.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id == id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Not Found",
//     });
//   }
//   res.status(200).json({
//     success: true,
//     data: user,
//   });
// });

exports.getAllUsersById = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user || user.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No user's in DB with id :" + id,
    });
  }

  res.status(200).json({
    success: true,
    message: `user found ${id}`,
    user: user,
  });
};

// app.post("/", (req, res) => {
//   const {
//     id,
//     name,
//     surname,
//     email,
//     issuedBooks,
//     issuedDate,
//     returnDate,
//     subscriptionType,
//     subscriptionDate,
//   } = req.body;
//   if (
//     !id ||
//     !name ||
//     !surname ||
//     !email ||
//     !issuedBooks ||
//     !issuedDate ||
//     !returnDate ||
//     !subscriptionDate ||
//     !subscriptionType
//   ) {
//     return res.status(404).json({
//       success: true,
//       message: "please Provide all the Details",
//     });
//   }
//   const userID = users.find((each) => each.id == id);
//   if (userID) {
//     return res.status(409).json({
//       success: false,
//       message: `User Already Exits with id ${id}`,
//     });
//   }

//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     issuedBooks,
//     issuedDate,
//     returnDate,
//     subscriptionType,
//     subscriptionDate,
//   });

//   res.status(201).json({
//     success: true,
//     message: `User registered Success fully with ID ${id}`,
//   });
// });

exports.addUser = async (req, res) => {
  const { data } = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(404).json({
      success: false,
      message: "Please Provide Proper Details",
    });
  }
  await userModel.create(data);

  const users = await userModel.find();

  res.status(200).json({
    success: true,
    message: "User added Successfully",
    data: data,
    users: users,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(404).json({
      success: false,
      message: "Please Provide Proper Details",
    });
  }

  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: updatedUser,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const userPresent = await userModel.findById(id);

  if (!userPresent) {
    return res.status(404).json({
      success: false,
      message: "User not Found",
    });
  }

  await userModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `User Deleted with Id : ${id}`,
  });
};

// app.get("/subsciption-details/:id", (req, res) => {
//   const { id } = req.params;

//   //find the user by their id
//   const user = users.find((each) => each.id == id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "No user with Subscription",
//     });
//   }

//   // Extract the Subscription details

//   const getDateInDays = (data = "") => {
//     let date;
//     if (data) {
//       date = new Date(data);
//     } else {
//       date = new Date();
//     }
//     let days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
//     return days;
//   };

//   const subscriptionType = (date) => {
//     if (user.subscriptionType.toLowerCase() === "basic") {
//       date = date + 30;
//     } else if (user.subscriptionType.toLowerCase() === "standard") {
//       date = date + 100;
//     } else if (user.subscriptionType.toLowerCase() === "premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   // subscription Callculation
//   // january 1, 1970 UTC // milliseec
//   let returningDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExp = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     subscriptionExpired: subscriptionExp < currentDate,
//     daysLeftForExpired:
//       subscriptionExp < currentDate
//         ? "Subscription Expired"
//         : subscriptionExp - currentDate,
//     returnDate:
//       returningDate < currentDate ? "Book is OverDue" : user.returnDate,
//     fine:
//       returningDate < currentDate
//         ? subscriptionExp <= currentDate
//           ? 200
//           : 100
//         : 0,
//   };

//   res.status(200).json({
//     success: true,
//     data: data,
//   });
// });

exports.subcriptionDetailsID = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found ",
    });
  }

  const getDateInDays = (data) => {
    let date;
    if (data) {
      date = new Date(data);
    } else {
      date = new Date();
    }
    // converting into days
    const days = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (days) => {
    if (user.subscriptionType === "Premium") {
      days = days + 365;
    } else if (user.subscriptionType === "Standard") {
      days = days + 100;
    } else if (user.subscriptionType === "Basic") {
      days = days + 30;
    }
  };

  const returnDateInDays = getDateInDays(user.returnDate);
  const currentDateInDays = getDateInDays();
  const subscriptionDateInDays = getDateInDays(user.subscriptionDate);
  const subsciptionExpDateInDays = subscriptionType(subscriptionDateInDays);

  const data = {
    ...user._doc,
    subscriptionExpired: subsciptionExpDateInDays < currentDateInDays,
    DaysLeftForExpired:
      subsciptionExpDateInDays < currentDateInDays
        ? "Subscription Expired"
        : subsciptionExpDateInDays - currentDateInDays,
    returnDate:
      returnDateInDays < currentDateInDays
        ? "Book is OverDue"
        : user.returnDate,
    fine:
      returnDateInDays < currentDateInDays
        ? subsciptionExpDateInDays < currentDateInDays
          ? 200
          : 100
        : 0,
  };

  res.status(200).json({
    success: true,
    message: data,
  });
};
