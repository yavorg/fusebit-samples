module.exports = (qbo, ctx, cb) => {
  qbo.getUserInfo((err, userInfo) => {
    if (err) {
      cb(null, { status: 500, body: { errorCode: err.code } });
    } else {
      cb(null, { status: 200 });
    }
  });
};
